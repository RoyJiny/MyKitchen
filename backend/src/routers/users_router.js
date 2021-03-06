const express = require("express");
const router = new express.Router();

const User = require('../models/User');
const Kitchen = require("../models/Kitchen");
const Order = require("../models/Order");

const auth = require('../middleware/auth');
const { matchUserKitchen,matchUserOrder } = require('../middleware/matchUser');
const {get_coordinates} = require('../external_api/geocoding');

const calculate_distance = require("../utils/distance");

const DEFAULT_COVER_IMAGE_ID = "61eac47694cd68ceaca675d3"
const DEFAULT_DISH_IMAGE_ID = "61ed568e040611a76a9443ec"

// Users Registration, info and editing - START
router.post("/users/customer/register", async (req,res) => {
    try {
        user_data = req.body;

        if (await User.findOne({googleId: user_data.googleId})) {
            res.status(401).send({error: 'user already exists'});
            return;
        }

        const user = new User(user_data);
        await user.save();
        
        const token = await user.generateAuthToken();
        
        res.status(201).send({token});
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/seller/register", async (req,res) => {
    try {
        user_data = req.body.user;
        kitchen_data = req.body.kitchen;

        if (await User.findOne({googleId: user_data.googleId})) {
            res.status(401).send({error: 'user already exists'});
            return;
        }
        
        const coordinates = await get_coordinates(`${kitchen_data.bio.street}, ${kitchen_data.bio.city}`)
        kitchen_data.bio = { ...kitchen_data.bio, coordinates, coverImg:DEFAULT_COVER_IMAGE_ID };
        kitchen_data.menu.forEach(dish => {
            dish.img = DEFAULT_DISH_IMAGE_ID
        });

        const user = new User(user_data);
        
        kitchen_data.seller = user._id;
        const kitchen = new Kitchen(kitchen_data);

        await user.save();
        await kitchen.save();

        const dishes_ids = kitchen.menu.map(dish => dish._id);

        const token = await user.generateAuthToken();
        res.status(201).send({token: token, kitchen_id: kitchen._id, dishes_ids: dishes_ids});
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/signin", async (req,res) => {
    try {
        const user = await User.findOne({ googleId: req.body.googleId });
        if (!user) {
            return res.status(401).send({error:'The user does not exist'});
        }

        const token = await user.generateAuthToken();
        const data = {token: token};

        if (!user.isSeller) {
            return res.send(data);
        } else {
            const kitchen = await Kitchen.findOne({ seller: user._id });
            data.kitchen_id = kitchen._id || '-1';
            res.send(data);
        }
    }  catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.get("/users/signout", auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            token => token.token !== req.token
        );
        if (req.user.expoPushToken) req.user.expoPushToken = undefined

        await req.user.save();

        res.send("Signed Out");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/notification_token", auth,  async (req,res) => {
    try {
        const token = req.body.expo_token;
        if (!token) throw new Error("Missing Token");
        
        if (!await User.findByIdAndUpdate(req.user._id, {expoPushToken: token}))
            throw new Error("Couldn't find user");

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/seller/edit/bio", [auth, matchUserKitchen],  async (req,res) => {
    try {
        new_data = req.body.bio; 

        const coordinates = await get_coordinates(`${new_data.street}, ${new_data.city}`)
        new_data = { ...new_data, coordinates };

        await Kitchen.findByIdAndUpdate(req.body.id, {bio: {...req.kitchen.bio ,...new_data}})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/seller/edit/menu", [auth, matchUserKitchen],  async (req,res) => {
    try {
        let kitchen = await Kitchen.findById(req.body.id);
        if (!kitchen) throw new Error("Kitchen does not exist");

        kitchen.menu = req.body.menu;
        await kitchen.save();

        res.send({dish_ids: kitchen.menu.map(dish => dish._id)});
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/seller/edit/logistics", [auth, matchUserKitchen],  async (req,res) => {
    try {
        new_data = req.body.logistics;

        await Kitchen.findByIdAndUpdate(req.body.id, {logistics: new_data})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/seller/edit/set_temp_close", [auth, matchUserKitchen],  async (req,res) => {
    try {
        is_close = req.body.close;

        await Kitchen.findByIdAndUpdate(req.body.id, {isTemporarilyClose: is_close})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.get("/users/me", auth, async (req,res) => {
    const user = await User.findById(req.user._id).populate('favorites');
    res.send(user);
});

router.get("/users/me/seller", auth, async (req,res) => {
    const kitchen = await Kitchen.findOne({ seller: req.user._id });
    res.send({user: req.user, kitchen: kitchen});
});

// Users Registration, info and editing - END

router.post("/seller/populate_usernames",auth, async (req,res) => {
    try { 
        const users = req.body.users || [];
        const new_users = [];
        for (const u of users) {
            const user = await User.findById(u.user_id)
            if (user) {
                new_users.push({...u,username: user.name});
            }
        };
        res.send({users: new_users});
    } catch (err) {
        console.log(err);
        res.status(500).send({error: "Server Error"});
    }
});

// Customer Addresses - START
router.get("/users/customer/addresses", auth, async (req,res) => {
    try {
        addresses = req.user.addresses;
        res.send({addresses})
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/customer/addresses/add", auth, async (req,res) => {
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
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/customer/addresses/remove", auth, async (req,res) => {
    try {
        user = req.user;
        address_name = req.body.address_name;
        
        user.addresses = user.addresses.filter(a => a.name !== address_name);
        await user.save();

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});
// Customer Addresses - END

// Customer requests - START
router.post("/users/customer/rate_kitchen", [auth, matchUserOrder], async (req,res) => {
    try {
        rating = req.body.rating;
        
        if(req.order.rated == true){
            res.status(400).send({message: 'Order was already rated'});
        }

        const kitchen = await Kitchen.findById(req.order.kitchen);

        new_rating = {value: (kitchen.rating.value * kitchen.rating.count + rating)/(kitchen.rating.count + 1), count: (kitchen.rating.count + 1)}

        await Kitchen.findByIdAndUpdate(req.order.kitchen, {rating: new_rating})
        await Order.findByIdAndUpdate(req.order._id, {rated: true})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/customer/edit/favorites", auth, async (req,res) => {
    try {
        new_favorites = req.body.favorites;

        await User.findByIdAndUpdate(req.user._id, {favorites: new_favorites})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/customer/edit/favorites/add", auth, async (req,res) => {
    try {
        kitchenID = req.body.id;
        favorites = req.user.favorites

        if (!favorites.includes(kitchenID)) {await User.findByIdAndUpdate(req.user._id, {favorites: [...favorites, kitchenID]})}

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/customer/edit/favorites/remove", auth, async (req,res) => {
    try {
        kitchenID = req.body.id;

        await User.findByIdAndUpdate(req.user._id, {favorites: req.user.favorites.filter(id => id != kitchenID)})

        res.send("Processed Successfuly");
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.get("/users/customer/pastKitchens", auth, async (req,res) => {
    try {
        let orders = await Order.find({customer: req.user._id}).populate('kitchen');
        let kitchens = [...new Set(orders.map(a => a.kitchen))];
        res.status(200).send(kitchens);
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/customer/getDistance", auth, async (req,res) => {
    try {
        let kitchen = await Kitchen.findById(req.body.id);
        if (!kitchen) throw new Error('Unknown kitchen');

        const distance = calculate_distance(kitchen.bio.coordinates, req.body.location);

        res.status(200).send({distance});
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/users/customer/addressesWithCanDeliver", auth, async (req,res) => {
    try {
        addresses = req.user.addresses;
        let kitchen = await Kitchen.findById(req.body.kitchenID);
        if (!kitchen) throw new Error('Unknown kitchen');

        adderessesWithCanDeliver = addresses.map(address => {
        return {
            name: address.name,
            address: address.address,
            canDeliver: (kitchen.logistics.isSupportDelivery && kitchen.logistics.maxDeliveryDistance >= calculate_distance(kitchen.bio.coordinates, {latitude: address.latitude, longitude: address.longitude}))
        }
        });
        res.status(200).send({adderessesWithCanDeliver})
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});


router.post("/users/customer/addressCanDeliver", auth, async (req,res) => {
    try {
        address = req.body.address;
        
        let kitchen = await Kitchen.findById(req.body.kitchenID);
        if (!kitchen) throw new Error('Unknown kitchen');

        const coordinates = await get_coordinates(address);

        if (coordinates.error) {
            canDeliver = false;
        } else {
            canDeliver = kitchen.logistics.isSupportDelivery && kitchen.logistics.maxDeliveryDistance >= calculate_distance(kitchen.bio.coordinates, {latitude: coordinates.latitude, longitude: coordinates.longitude})
        }
        res.status(200).send(canDeliver);
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

// Customer requests - END

module.exports = router;