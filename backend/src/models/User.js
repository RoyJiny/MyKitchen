const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ENV = require('../../config/env');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
  ],
  }
);

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    {_id: user._id.toString()},
    ENV.JWT_SECRET
  );
  user.tokens = (user.tokens || "").concat({token});
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;