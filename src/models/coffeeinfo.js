const mongoose = require('mongoose');

mongoose.model(
    'CoffeeInformation',
    mongoose.Schema({
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CoffeeName',
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