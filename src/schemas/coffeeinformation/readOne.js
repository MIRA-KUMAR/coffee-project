const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const CoffeeInformationModel = mongoose.model('CoffeeInformation');

    const data = await CoffeeInformationModel.findById(req.params.id);

    return res.status(200).send(data);
}