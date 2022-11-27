const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24),
})
module.exports = async (req, res, next) => {
    const params = schema.validate(req.params);

    if (params.error) {
        return res.send(params.error);
    }
    const CoffeeInformationModel = mongoose.model('CoffeeInformation');

    if (await CoffeeInformationModel.exists({_id: mongoose.mongo.ObjectId(params.value.id)})) {
        const data = await CoffeeInformationModel.findById(req.params.id);

        return res.status(200).send(data);
    }
    return res.status(404).send({sucess: false});
}