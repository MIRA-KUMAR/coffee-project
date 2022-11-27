const mongoose = require('mongoose');
const joi = require('joi');


const schema = joi.object({
    name: joi.string().required(),
});

module.exports = async (req, res) => {
    const {error, value} = schema.validate(req.body);

    if (error) {
        return res.send(error);
    }
    const CoffeeTypeModel = mongoose.model('CoffeeType');
    const newData = new CoffeeTypeModel(value);
    await newData.save();

    return res.status(200).send(newData);
}