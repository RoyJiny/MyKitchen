const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    img: {
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;