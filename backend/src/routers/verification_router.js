const axios = require('axios');
const express = require("express");
const router = new express.Router();

const User = require('../models/User');

const auth = require('../middleware/auth');

router.get("/verify/request_verification/", auth, async (req,res) => {
    try {
      const phone = req.query.phone;
      if (!phone) throw new Error('Missing phone number');

      await axios.post(
        'https://api.authy.com/protected/json/phones/verification/start',
        {
          "via": "sms",
          "phone_number": phone,
          "country_code": 972,
          "code_length": 6
        },
        {
          headers: {
            "X-Authy-API-Key": process.env.TWILIO_AUTH_TOKEN
          }
        }
      );

      res.sendStatus(200);
    } catch (err) {
      // maybe add here 401 status for invalid phone input? (err.isAxiosError?)
      console.log(err);
      res.status(500).send({error: 'Server Error'});
    }
});

router.post("/verify/submit_code/", auth, async (req,res) => {
    try {
      const code = req.body.code;
      if (!code) throw new Error('Missing code');
      const phone = req.body.phone;
      if (!phone) throw new Error('Missing phone number');

      const {data} = await axios.get(
        'https://api.authy.com/protected/json/phones/verification/check',
        {
          params: {
            "phone_number": phone,
            "country_code": 972,
            "verification_code": code
          },
          headers: {
            "X-Authy-API-Key": process.env.TWILIO_AUTH_TOKEN
          }
        }
      );

      if (data.success) {
        res.send({msg: data.message});
        // set the phone number of req.user here !
        await User.findByIdAndUpdate(req.user._id, {phone: phone})
      } else {
        res.status(401).send({msg: data.message});
      };

    } catch (err) {
      if (err.isAxiosError) {
        res.status(err.response.status).send({err: err.response.data.message})
      } else {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
      }
    }
});

router.get("/verify/request_verification/bio/", async (req,res) => {
  try {
    const phone = req.query.phone;
    if (!phone) throw new Error('Missing phone number');

    await axios.post(
      'https://api.authy.com/protected/json/phones/verification/start',
      {
        "via": "sms",
        "phone_number": phone,
        "country_code": 972,
        "code_length": 6
      },
      {
        headers: {
          "X-Authy-API-Key": process.env.TWILIO_AUTH_TOKEN
        }
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Server Error'});
  }
});

router.post("/verify/submit_code/bio/", async (req,res) => {
  try {
    const code = req.body.code;
    if (!code) throw new Error('Missing code');
    const phone = req.body.phone;
    if (!phone) throw new Error('Missing phone number');

    const {data} = await axios.get(
      'https://api.authy.com/protected/json/phones/verification/check',
      {
        params: {
          "phone_number": phone,
          "country_code": 972,
          "verification_code": code
        },
        headers: {
          "X-Authy-API-Key": process.env.TWILIO_AUTH_TOKEN
        }
      }
    );

    if (data.success) {
      res.send({msg: data.message});
    } else {
      res.status(401).send({msg: data.message});
    };

  } catch (err) {
    if (err.isAxiosError) {
      res.status(err.response.status).send({err: err.response.data.message})
    } else {
      console.log(err);
      res.status(500).send({error: 'Server Error'});
    }
  }
});

router.get("/verify/request_verification/edit/", auth, async (req,res) => {
  try {
    const phone = req.query.phone;
    if (!phone) throw new Error('Missing phone number');

    await axios.post(
      'https://api.authy.com/protected/json/phones/verification/start',
      {
        "via": "sms",
        "phone_number": phone,
        "country_code": 972,
        "code_length": 6
      },
      {
        headers: {
          "X-Authy-API-Key": process.env.TWILIO_AUTH_TOKEN
        }
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Server Error'});
  }
});

router.post("/verify/submit_code/edit/", auth, async (req,res) => {
  try {
    const code = req.body.code;
    if (!code) throw new Error('Missing code');
    const phone = req.body.phone;
    if (!phone) throw new Error('Missing phone number');

    const {data} = await axios.get(
      'https://api.authy.com/protected/json/phones/verification/check',
      {
        params: {
          "phone_number": phone,
          "country_code": 972,
          "verification_code": code
        },
        headers: {
          "X-Authy-API-Key": process.env.TWILIO_AUTH_TOKEN
        }
      }
    );

    if (data.success) {
      res.send({msg: data.message});
      // set the phone number of kitchen here !
      const kitchen = await Kitchen.findOne({ seller: req.user._id });
      kitchen.bio.phone = phone;
      await kitchen.save()
    } else {
      res.status(401).send({msg: data.message});
    };

  } catch (err) {
    if (err.isAxiosError) {
      res.status(err.response.status).send({err: err.response.data.message})
    } else {
      console.log(err);
      res.status(500).send({error: 'Server Error'});
    }
  }
});

module.exports = router;