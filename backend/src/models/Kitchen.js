const mongoose = require('mongoose');

const kitchenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
);

const Kitchen = mongoose.model("Kitchen", kitchenSchema);

module.exports = Kitchen;