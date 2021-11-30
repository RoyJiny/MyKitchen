const Kitchen = require('../models/Kitchen');
const Order = require('../models/Order');

const matchUserKitchen = async (req, res, next) => {
    try {
        kitchen_data = req.body.kitchen;

        const kitchen = await Kitchen.findById(kitchen_data.id);

        if (!kitchen.seller.equals(req.user._id)) {
            throw new Error();
        }

        next();
    } catch (e) {
        res.status(401).send({ error: "User auth not matching Kitchen" });
    }
};

module.exports = matchUserKitchen;

const matchUserOrder = async (req, res, next) => {
    try {
        orderID = req.body.id;

        const order = await Order.findById(orderID);

        if (!order.customer.equals(req.user._id)) {
            throw new Error();
        }

        req.order = order;
        next();
    } catch (e) {
        res.status(401).send({ error: "User auth not matching Order" });
    }
};

module.exports = matchUserOrder;

const matchKitchenOrder = async (req, res, next) => {
    try {
        orderID = req.body.id;
        kitchenID = req.user.kitchen;

        const order = await Order.findById(orderID);

        if (!order.kitchen.equals(kitchenID)) {
            throw new Error();
        }

        req.order = order;
        next();
    } catch (e) {
        res.status(401).send({ error: "User auth not matching Order" });
    }
};

module.exports = matchKitchenOrder;