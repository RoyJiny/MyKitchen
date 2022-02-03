const express = require("express");
const router = new express.Router();

const auth = require('../middleware/auth');
const {send_notification_to_user} = require('../external_api/notifications');

const User = require('../models/User');
const Kitchen = require('../models/Kitchen');

router.post("/chats/sent_message", auth, async (req,res) => {
    try {
      const {customer_id,customer_name,kitchen_id,kitchen_name,isCustomer,text} = req.body;

      if (customer_id === undefined || customer_name === undefined || kitchen_id === undefined || kitchen_name === undefined || isCustomer === undefined || text === undefined)
        throw new Error("Missing parameters");

      const chatData = {
        customer_id,customer_name,kitchen_id,kitchen_name,
        isCustomer: !isCustomer
      }

      if (isCustomer) { // sent from customer
        const kitchen = await Kitchen.findById(kitchen_id).populate('seller');
        if (!kitchen) throw new Error('Kitchen does not exist');
        send_notification_to_user(kitchen.seller,'New Message',`${customer_name}: ${text}`,{chatData, type: 'Chat'});
      } else {
        const customer = await User.findById(customer_id);
        if (!customer) throw new Error('Customer does not exist');
        send_notification_to_user(customer,'New Message',`${kitchen_name}: ${text}`,{chatData, type: 'Chat'});
      }

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).send({error: 'Server Error'});
    }
});

module.exports = router;
