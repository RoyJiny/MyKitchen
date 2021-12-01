const express = require("express");
const router = new express.Router();

const Kitchen = require("../models/Kitchen");

const auth = require('../middleware/auth');

const calculate_distance = require('../utils/distance');

router.post("/search/kitchen/location", auth, async (req,res) => {
    try {
        const DISTANCE_LIMIT = 20;
        const user_location = req.body.location;

        var kitchens = await Kitchen.find();
        kitchens = kitchens.map(kitchen => { return { ...kitchen.toObject(), distance: calculate_distance(user_location,kitchen.bio.coordinates)} });
        
        kitchens.filter(kitchen => kitchen.distance < DISTANCE_LIMIT);
        kitchens.sort((kitchen1,kitchen2) => kitchen1.distance - kitchen2.distance);

        res.send(kitchens);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;