const mongoose = require('mongoose');

mongoose.Model(
    'CoffeeType',
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