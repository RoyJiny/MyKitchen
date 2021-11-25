const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    data: Buffer,
    contentType: String
  }
);

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    img: {
      type: imageSchema,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  }
);

const kitchenSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bio: {
      name: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      coordinates: {
        longitude: {
          type: Number,
          required: true
        },
        latitude: {
          type: Number,
          required: true
        }
      },
      phone: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      tags: [
        {
          type: String
        }
      ],
      coverImg: {
        type: imageSchema,
        required: true
      },
      required: true
    },
    menu: [
      {
        type: dishSchema
      }
    ],
    logistics: {
      isOnlyFutureDelivery: {
        type: Boolean,
        required: true,
        default: false
      },
      operationDays: [
        {
          day: {
            type: String,
            required: true
          },
          isActive: {
            type: Boolean,
            required: true
          },
          startTime: {
            type: String,
            required: true,
            default: ''
          },
          endTime: {
            type: String,
            required: true,
            default: ''
          }
        }
      ],
      isSupportDelivery: {
        type: Boolean,
        required: true
      },
      maxDeliveryDistance: {
        type: Number,
        required: false
      },
      paymentLinks: [
        {
          type: String
        }
      ]
    },
    rating: {
      value: {
        type: Number,
        required: true
      },
      count: { // for average calculations
        type: Number,
        required: true,
        default: 0
      }
    }
  }
);

const Kitchen = mongoose.model("Kitchen", kitchenSchema);

module.exports = Kitchen;