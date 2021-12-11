const Kitchen = require('../models/Kitchen');
const Order = require('../models/Order');

const matchUserKitchen = async (req, res, next) => {
    try {
        kitchen_id = req.body.kitchenID;

        const kitchen = await Kitchen.findById(kitchen_id);

        if (!kitchen.seller.equals(req.user._id)) {
            throw new Error();
        }
        
        req.kitchen = kitchen;
        next();
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
};

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
        res.status(401).send("Unauthorized");
    }
};

const matchKitchenOrder = async (req, res, next) => {
    try {
        let orderID = req.body.id;
        let kitchenID = req.user.kitchen;

        const order = await Order.findById(orderID);

        if (!order.kitchen.equals(kitchenID)) {
            throw new Error();
        }
        
        req.order = order;
        next();
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
};

module.exports = {
    matchUserKitchen,
    matchUserOrder,
    matchKitchenOrder
};
