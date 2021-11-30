const axios = require('axios');

const ENV = require('../../config/env');

const get_coordinates = async (address) => {
  const params = {
    q: address,
    key: ENV.OPENCAGE_API_KEY
  }

  try {
    const res = await axios.request(`https://api.opencagedata.com/geocode/v1/json`,{params});
    return {
      longitude: res.data.results[0].geometry.lng,
      latitude: res.data.results[0].geometry.lat,
    };
  } catch (err) {
    console.log(err);
    return {
      longitude: 0,
      latitude: 0
    };
  }
}

module.exports = {
  get_coordinates
};
