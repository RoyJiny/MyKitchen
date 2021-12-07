const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ENV = require('../../config/env');

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
        }).populate('favorites');

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Unauthorized" });
    }
};

module.exports = auth;
