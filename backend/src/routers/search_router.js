const express = require("express");
const router = new express.Router();

const Kitchen = require("../models/Kitchen");

const auth = require('../middleware/auth');

const calculate_distance = require('../utils/distance');

router.post("/search/kitchen/location", auth, async (req,res) => {
    try {
        const DISTANCE_LIMIT = 20;
        const user_location = req.body.coordinates;

        const distance_filter = (kitchen) => {
            return calculate_distance(user_location,kitchen.bio.coordinates) < DISTANCE_LIMIT;
        };
        const sort_function = (kitchen1,kitchen2) => {
            return calculate_distance(user_location,kitchen1.bio.coordinates) - calculate_distance(user_location,kitchen2.bio.coordinates);
        };

        const kitchens = (await Kitchen.find({})).filter(distance_filter);
        kitchens.sort(sort_function);

        res.send(kitchens);        
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;