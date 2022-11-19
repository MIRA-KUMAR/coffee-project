const mongoose = require('mongoose');

mongoose.Model(
    'CoffeeName',
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