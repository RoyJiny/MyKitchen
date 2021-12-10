const axios = require('axios');
const express = require("express");
const router = new express.Router();

const ENV = require('../../config/env');

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
            "X-Authy-API-Key": ENV.TWILIO_AUTH_TOKEN
          }
        }
      );

      res.sendStatus(200);
    } catch (err) {
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
            "X-Authy-API-Key": ENV.TWILIO_AUTH_TOKEN
          }
        }
      );

      if (data.success) {
        res.send({msg: data.message});
        // set the phone number of req.user here !
      } else {
        res.status(401).send({msg: data.message});
      };

    } catch (err) {
      if (err.isAxiosError) {
        res.status(err.response.status).send(err.response.data.message)
      } else {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
      }
    }
});

module.exports = router;