const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: ''
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
    googleId: {
      type: String,
      required: true
    },
    expoPushToken: {
      type: String
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    addresses: [
      {
        name: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        longitude: {
          type: Number,
          required: true
        },
        latitude: {
          type: Number,
          required: true
        }
      }
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kitchen'
      }
    ],
  }
);

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    {_id: user._id.toString()},
    process.env.JWT_SECRET
  );
  user.tokens = (user.tokens || "").concat({token});
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;