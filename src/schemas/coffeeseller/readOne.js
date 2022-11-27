const mongoose = require('mongoose');
const joi = require('joi');

module.exports = async (req, res) => {

    const schema = joi.object({
        id: joi.string().hex().length(24)
    })
    const params = schema.validate(req.params);
    
    if(params.error) {
        return res.send(params.error);
    }
    const CoffeeSellerModel = mongoose.model('CoffeeSeller');
    if (await CoffeeSellerModel.exists({_id: mongoose.mongo.ObjectId(params.value.id)})) {
        const coffeesellerdata = await CoffeeSellerModel.findById(params.value.id);

        return res.status(200).send(coffeesellerdata);
    }

    return res.status(404).send({sucess: false});
}
