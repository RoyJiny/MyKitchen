const express = require("express");
const router = new express.Router();

const Kitchen = require("../models/Kitchen");

const auth = require('../middleware/auth');

const calculate_distance = require('../utils/distance');

router.post("/search/kitchen/text", auth, async (req,res) => {
    try {
        const user_location = req.body.location;
        const text_query = req.body.text_query;

        var kitchens = await Kitchen.find({
            $or: [
                { "bio.name": new RegExp(text_query, 'gi') },
                { "bio.description": new RegExp(text_query, 'gi') }
            ]
        });
        
        kitchens = kitchens.map(kitchen => { return { ...kitchen.toObject(), distance: calculate_distance(user_location,kitchen.bio.coordinates)} });
        kitchens.sort((kitchen1,kitchen2) => kitchen1.distance - kitchen2.distance);

        res.send(kitchens);
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

router.post("/search/kitchen/tag", auth, async (req,res) => {
    try {
        const user_location = req.body.location;
        const tag = req.body.tag;

        var kitchens = await Kitchen.find({
            "bio.tags": tag
        });
        
        kitchens = kitchens.map(kitchen => { return { ...kitchen.toObject(), distance: calculate_distance(user_location,kitchen.bio.coordinates)} });
        kitchens.sort((kitchen1,kitchen2) => kitchen1.distance - kitchen2.distance);

        res.send(kitchens);
    } catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
    }
});

module.exports = router;