const express = require("express");
const router = new express.Router();

const auth = require('../middleware/auth');

router.post("/users/register", (req,res) => {
    user_id = req.body.user_id;
    if (!user_id) {
        console.log('No user id provided');
        res.status(401).send('Wrong data provided');
        return;
    }
    console.log(`Received user id '${user_id}''`)

    /* get token from firebase by firebase uid */
    
    /* save token inside mongo db (and create a new user) */

    res.send('User registered successfuly');
});

module.exports = router;