const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    kitchen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    comments: {
      type: String,
      required: false
    },
    isPickup: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveryAddress: {
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: ['Pending Approval','Waiting for Payment','In the Making','Ready for Customer','Done'],
      required: true,
      default: 'Pending Approval'
    },
    rated: {
      type: Boolean,
      required: true,
      default: false
    },
    items: [
      {
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ],
    dueDate: {
      type: String,
      required: true,
      default: 'ASAP'
    },
    date: {
      type: String,
      required: true,
      default: 'ASAP'
    }
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;