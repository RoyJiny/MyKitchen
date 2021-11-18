const express = require("express");
const router = new express.Router();

const auth = require('../middleware/auth');


router.get("/users/test", auth, (req,res) => {
    res.send('Hi there');
});

module.exports = router;