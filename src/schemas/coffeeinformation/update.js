const mongoose = require('mongoose');
const joi = require('joi');

const schema = joi.object({
    id: joi.string().hex().length(24) 
});

const bodySchema = joi.object({
    name: joi.string().hex().length(24),
    type: joi.array().items(joi.string().hex().length(24)),
    rating: joi.number(),
    reviews: joi.number(),
    seller: joi.array().items(joi.string().hex().length(24)),
    price: joi.number(),
    weight: joi.number(),
})

module.exports = async (req, res, next) => {
    const params = schema.validate(req.params);
    const body = bodySchema.validate(req.body);

    if (params.error) {
        return res.status(404).send(params.error);
    }
    if (body.error) {
        return res.status(500).send(body.error);
    }

    const CoffeeInformationModel = mongoose.model('CoffeeInformation');
    
    try {
        if (await CoffeeInformationModel.exists({_id: mongoose.mongo.ObjectId(params.value.id)})) {
        const update = await CoffeeInformationModel.findOneAndUpdate({
            _id: mongoose.mongo.ObjectId(params.value.id) 
        }, {
            $set: body.value
        }, {
            new: true
        });

        return res.status(200).send({success: true, value: update});
        }
    return res.status(404).send({success: false});
    }
    catch(err) {
        console.log(err);
        return res.status(501).send(err);
    }
}