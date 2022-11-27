const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24),
})

module.exports = async (req, res, next) => {
    const {error, value} = schema.validate(req.params);

    if (error) {
        return res.send(error);
    }

    const CoffeeInformationModel = mongoose.model('CoffeeInformation');

    if (await CoffeeInformationModel.exists({_id: mongoose.mongo.ObjectId(value.id)})) {
        await CoffeeInformationModel.deleteOne({
            _id: mongoose.mongo.ObjectId(value.id)
        });
        return res.status(200).send({success: true});
    }
    return res.status(404).send({ success: false});
}