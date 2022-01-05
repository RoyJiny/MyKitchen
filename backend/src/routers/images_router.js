const fs = require("fs");
const express = require("express");
const multer = require("multer");

const router = new express.Router();

const Image = require("../models/Image");
const Kitchen = require("../models/Kitchen");

const auth = require('../middleware/auth');

const LOCAL_UPLOAD_FOLDER = `${process.env.NODE_ENV === 'production' ? '/tmp' : '.'}/uploads/`

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, LOCAL_UPLOAD_FOLDER);
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const multer_upload = multer({storage: Storage});

router.post("/upload/", auth, multer_upload.single('img'), async (req,res) => {
  try {
    const file_path = LOCAL_UPLOAD_FOLDER + req.file.filename;

    const image_obj = {
      img: {
        data: fs.readFileSync(file_path),
        contentType: 'image/jpg'
      }
    };

    const image = new Image(image_obj);
    await image.save();
    fs.unlinkSync(file_path); // delete local file after uploaded to the db
    
    const kitchenId = req.body.kitchenId;
    const kitchen = await Kitchen.findById(kitchenId);
    if (!kitchen) throw new Error();
    
    switch (req.body.type) {
      case 'coverImg':    
        kitchen.bio.coverImg = image._id;
        await kitchen.save();
        break;
      case 'dishImg':
        const dishIdx = kitchen.menu.findIndex(dish => dish._id.toString() === req.body.dishId);
        kitchen.menu[dishIdx].img = image._id;
        await kitchen.save();
        break;
      default:
        throw new Error('Unknown image type');
    };

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.get("/images/:id", async (req,res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) throw new Error();

    res.set("Content-Type", image.img.contentType);
    res.send(image.img.data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
