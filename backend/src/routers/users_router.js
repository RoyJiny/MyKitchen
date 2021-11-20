const express = require("express");
const router = new express.Router();

const User = require('../models/User');

const auth = require('../middleware/auth');

router.post("/users/signin", async (req,res) => {
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

router.get("/users/me", auth, async (req,res) => {
    const user = req.user; // applied through the auth middleware after token verification
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