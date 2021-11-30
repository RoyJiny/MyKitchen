const express = require("express");
const router = new express.Router();

const User = require('../models/User');
const Kitchen = require("../models/Kitchen");

const auth = require('../middleware/auth');
const matchUserKitchen = require('../middleware/matchUser');
const matchUserOrder = require('../middleware/matchUser');
const {get_coordinates} = require('../external_api/geocoding');

// Users Registration, info and editing - START
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

        const coordinates = await get_coordinates(`${kitchen_data.bio.street}, ${kitchen_data.bio.city}`)
        kitchen_data.bio = { ...kitchen_data.bio, coordinates };

        const user = new User(user_data);
        
        kitchen_data.seller = user._id;
        const kitchen = new Kitchen(kitchen_data);
        
        await user.save();
        await kitchen.save();

        const token = await user.generateAuthToken();
        res.status(201).send({token: token, kitchen_id: kitchen._id});
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.post("/users/seller/edit/bio", auth, matchUserKitchen,  async (req,res) => {
    try {
        kitchen_data = req.body.kitchen; // TBD: maybe send bio only? 

        const coordinates = await get_coordinates(`${kitchen_data.bio.street}, ${kitchen_data.bio.city}`)
        kitchen_data.bio = { ...kitchen_data.bio, coordinates };

        await Kitchen.findByIdAndUpdate(kitchen_data.id, {bio: kitchen_data.bio})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.post("/users/seller/edit/menu", auth, matchUserKitchen,  async (req,res) => {
    try {
        kitchen_data = req.body.kitchen;

        await Kitchen.findByIdAndUpdate(kitchen_data.id, {menu: kitchen_data.menu})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.post("/users/seller/edit/logistics", auth, matchUserKitchen,  async (req,res) => {
    try {
        kitchen_data = req.body.kitchen;

        await Kitchen.findByIdAndUpdate(kitchen_data.id, {logistics: kitchen_data.logistics})

        res.send("Processed Successfuly");
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
// Users Registration, info and editing - END

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

        const coordinates = await get_coordinates(new_address.address);
        new_address = {...new_address, ...coordinates};

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

router.post("/users/customer/rate_kitchen", auth, matchUserOrder, async (req,res) => {
    try {
        rating = req.body.rating;
        order_data = req.body.order;
        
        const kitchen = await Kitchen.findById(order_data.kitchen);

        new_rating = {value: (kitchen.rating.value * kitchen.rating.count + rating)/(kitchen.rating.count + 1), count: (kitchen.rating.count + 1)}

        await Kitchen.findByIdAndUpdate(order_data.kitchen, {rating: new_rating})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;