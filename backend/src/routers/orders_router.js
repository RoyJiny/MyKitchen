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
    res.status(500).send('Server Error');
}
});

module.exports = router;