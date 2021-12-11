const express = require("express");
const router = new express.Router();

const Kitchen = require("../models/Kitchen");
const Order = require("../models/Order");

const auth = require('../middleware/auth');

router.post("/order/submit", auth, async (req,res) => {
  try {
    order_data = req.body;
    const user = req.user;

    order_data.customer = user._id;

    // validate that the kitchen exists with the given id
    const kitchen = await Kitchen.findOne({_id: order_data.kitchen});
    if (!kitchen) { throw new Error(); }

    const order = new Order(order_data);
    await order.save();
    
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Server Error'});
  }
});


router.post("/orders/seller/update_status", [auth], async (req,res) => {
  try {
    updated_status = req.body.status;
    
    await Order.findByIdAndUpdate(req.body.id, {"status":updated_status});
    
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