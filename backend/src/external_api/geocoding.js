const axios = require('axios');

const get_coordinates = async (address) => {
  const params = {
    q: address,
    key: process.env.OPENCAGE_API_KEY
  }

  try {
    const res = await axios.request(`https://api.opencagedata.com/geocode/v1/json`,{params});
    return {
      longitude: res.data.results[0].geometry.lng,
      latitude: res.data.results[0].geometry.lat,
    };
  } catch (err) {
    console.log('Failed to get coordinates:',err);
    return {
      // Tel Aviv University as default coordinates
      longitude: 34.804385,
      latitude: 32.113328
    };
  }
}

module.exports = {
  get_coordinates
};
