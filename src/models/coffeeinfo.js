const mongoose = require('mongoose');

mongoose.model(
    'CoffeeInformation',
    mongoose.Schema({
        name: {
            type: String, 
            required: true,
        },
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CoffeeType',
        }],
        "rating": Number,
        "reviews": Number,
        seller: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CoffeeSeller',
        }],
        "price": Number,
        "weight": Number

    },{
        timestamps: true,
    })
)