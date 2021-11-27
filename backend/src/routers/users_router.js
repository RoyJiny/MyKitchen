const express = require("express");
const router = new express.Router();

const User = require('../models/User');
const Kitchen = require("../models/Kitchen");

const auth = require('../middleware/auth');

// Users Registration and info - START
router.post("/users/customer/register", async (req,res) => {
    try {
        user_data = req.body;

        const user = new User(user_data);
        await user.save();
        
        const token = await user.generateAuthToken();
        
        res.status(201).send({token});
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.post("/users/seller/register", async (req,res) => {
    try {
        user_data = req.body.user;
        kitchen_data = req.body.kitchen;

        const user = new User(user_data);
        
        kitchen_data.seller = user._id;
        const kitchen = new Kitchen(kitchen_data);
        
        await user.save();
        await kitchen.save();

        const token = await user.generateAuthToken();
        res.status(201).send({token});
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.get("/users/me", auth, async (req,res) => {
    const user = req.user;
    res.send(JSON.stringify(user));
});

router.get("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            token => token.token !== req.token
        );
        await req.user.save();

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});
// Users Registration and info - END

// Customer Addresses - START
router.get("/users/customer/addresses", auth, async (req,res) => {
    try {
        addresses = req.user.addresses;
        res.send({addresses})
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.post("/users/customer/addresses", auth, async (req,res) => {
    try {
        user = req.user;
        new_address = req.body.address;
        if (!new_address.name || !new_address.address) throw new Error();

        new_address.longitude = 0;
        new_address.latitude = 0;

        // if an address with that name exists, remove it and write the new one
        user.addresses = user.addresses.filter(a => a.name !== new_address.name);
        
        user.addresses = [...user.addresses, new_address];
        await user.save();

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.delete("/users/customer/addresses", auth, async (req,res) => {
    try {
        user = req.user;
        address_name = req.body.address_name;
        
        user.addresses = user.addresses.filter(a => a.name !== address_name);
        await user.save();

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});
// Customer Addresses - END

module.exports = router;