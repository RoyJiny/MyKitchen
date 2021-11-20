const mongoose = require('mongoose');
const ENV = require('../../config/env');

mongoose.connect(
  ENV.MONGODB_URL,
).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(`Failed to connect to MongoDB: ${err}`);
});