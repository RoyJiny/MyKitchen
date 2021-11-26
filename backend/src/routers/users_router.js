const express = require("express");
const router = new express.Router();

const User = require('../models/User');
const Kitchen = require("../models/Kitchen");

const auth = require('../middleware/auth');

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

module.exports = router;