const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
    items: [{
        name: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }],
    totalPrice: {
        type:Number
    },
    deliveryAddress: {
        type: Object,
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        zip: {
            type: String
        }
    },
    status: {
        type: String,
        enum: {
            values: ["placed", "preparing", "on the way", "delivered"],
            message: "Please select from this options: 'placed', 'preparing', 'on the way', 'delivered'"
        },
    }
}, {timestamps:true});
