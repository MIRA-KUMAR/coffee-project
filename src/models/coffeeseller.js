const mongoose = require('mongoose');

mongoose.Model(
    'CoffeeSeller',
    mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        }
    }, {
        timestamps: true,
    })
)