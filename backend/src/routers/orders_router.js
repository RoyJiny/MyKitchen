const express = require("express");
const router = new express.Router();

const Kitchen = require("../models/Kitchen");
const Order = require("../models/Order");

const auth = require('../middleware/auth');
const {send_notification_to_user} = require('../external_api/notifications');
const {send_email} = require('../utils/mail_handler')

router.post("/order/submit", auth, async (req,res) => {
  try {
    order_data = req.body;
    const user = req.user;

    order_data.customer = user._id;

    const kitchen = await Kitchen.findOne({_id: order_data.kitchen}).populate('seller');
    if (!kitchen) { throw new Error(); }
    
    const order = new Order(order_data);
    await order.save();
    
    const populated_order_data = await Order.findById(order._id).populate('customer');
    if (!populated_order_data) { throw new Error(); }

    send_notification_to_user(kitchen.seller,'New Order','You have received a new order', extra_data={order: populated_order_data, type: 'Order'});
    res.status(200).send("Processed Successfuly");
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Server Error'});
  }
});


router.post("/orders/seller/update_status", auth, async (req,res) => {
  try {
    const updated_status = req.body.status;
    if (!["Pending Approval","Waiting For Payment","In the Making","Ready for Customer","Done","Canceled"].includes(updated_status)) {
      throw new Error("Bad status");
    }
    
    const order = await Order.findByIdAndUpdate(req.body.id, {"status":updated_status}).populate('customer').populate('kitchen');
    if (!order) throw new Error("Couldn't find order");
    order.status = updated_status;

    if (updated_status !== "Pending Approval") {
      var description = "";
      switch (updated_status) {
        case "Waiting For Payment":
          description = `Your order was accepted by ${order.kitchen.bio.name}`;
          break;
        case "In the Making":
          description = `${order.kitchen.bio.name} received your payment and started working on your order`;
          break;
        case "Ready for Customer":
          description = `Your order from ${order.kitchen.bio.name} is ready`;
          break;
        case "Done":
          description = `Your order from ${order.kitchen.bio.name} was delivered successfuly`;
          break;
        case "Canceled":
          description = `Your order from ${order.kitchen.bio.name} was declined`;
          break;
      } 
      send_notification_to_user(order.customer,"Order Update",description,extra_data={order,type: 'Order'});
    }

    if (updated_status === 'Done') {
      send_email(
        order.customer.email,
        `Your receipt from ${order.kitchen.bio.name}`,
        `Your order from ${order.kitchen.bio.name} was delivered successfuly!\n\nItems:\n${order.items.map(item => `${item.name}  x${item.quantity}`).join('\n')}\n\nTotal: ???${order.price}\n\n\nThank You for using MyKitchen, hope to see you again :)`
      )
    }
    
    res.send("Processed Successfuly");
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Server Error'});
  }
});


router.get("/orders/seller/get_orders", auth, async (req,res) => {
  try {
    const user = req.user;

    let kitchen = await Kitchen.findOne({seller: user._id});
    if (!kitchen) { throw new Error(); }

    let orders = await Order.find({kitchen: kitchen._id}).populate("customer");
    if (!orders) { throw new Error(); }

    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Server Error'});
  }
});


router.get("/orders/customer/get_orders", auth, async (req,res) => {
  try {
    const user = req.user;

    let user_orders = await Order.find({customer: user._id}).populate('kitchen');
    if (!user_orders) { throw new Error(); }
    
    res.status(200).send(user_orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Server Error'});
  }
});

module.exports = router;