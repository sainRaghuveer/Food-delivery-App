const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type:String
    },
    address: {
        type:Object,
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
    menu: [{
        // _id: ObjectId,
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type:Number
        },
        image: {
            type:String
        }
    }]
});

const restaurantModel = mongoose.model("restaurant", restaurantSchema);


module.exports={
    restaurantModel
}
