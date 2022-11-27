const mongoose = require('mongoose');
const joi = require('joi');

module.exports = async (req, res) => {

    const schema = joi.object({
        page: joi.number().integer().min(1).default(1),
        limit: joi.number().integer().min(1).default(5)
    })
    const {error, value} = schema.validate(req.query);
    if (error) {
        return res.send(error);
    }
    const CoffeeTypeModel = mongoose.model('CoffeeType');
    const {page, limit} = value;
    const coffeetypedata = await CoffeeTypeModel.find().skip((page-1)*limit).limit(limit);
    const count = await CoffeeTypeModel.countDocuments();
    const totalPages = Math.ceil(count/limit);

    return res.status(200).send({
        data: coffeetypedata,
        paging: {
            total: count, 
            page: page,
            totalPages: totalPages
        }  
    });
}
