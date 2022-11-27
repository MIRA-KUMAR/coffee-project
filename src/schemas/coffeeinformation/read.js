const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const CoffeeInformationModel = mongoose.model('CoffeeInformation');
    const data = await CoffeeInformationModel.find();
    // console.log(data);
    return res.send(data);
};