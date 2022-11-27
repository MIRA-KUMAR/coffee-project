const mongoose = require('mongoose');
const joi = require('joi');

const bodySchema = joi.object({
    name: joi.string().required(),
    rating: joi.number().optional(),
    reviews: joi.number().optional(),
    price: joi.number().optional(),
    weight: joi.number().optional(),
});

module.exports = async (req, res, next) => {
    const {error, value } = bodySchema.validate(req.body);
    if (error){
        return res.send(error);
    }
    const CoffeeInformationModel = mongoose.model('CoffeeInformation');
    const newData = new CoffeeInformationModel(value);
    await newData.save();

    return res.status(200).send(newData);
}