const {MongoClient} = require('mongodb');

async function Read (request, response) {
    let {page, limit} = request.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const connection = await MongoClient.connect('mongodb://localhost:27017/coffee');
    const db = connection.db();
    
    const CoffeeDataCollection = db.collection('coffeeInformations');
    const totalCount = await CoffeeDataCollection.countDocuments();

    const data = await CoffeeDataCollection.find({})
                                            .skip((page-1)*limit)
                                            .limit(limit)
                                            .toArray();

    return response.send({
        success: true,
        value: {
            data,
            numberOfPages : Math.ceil(totalCount/limit)
        }
    });
}

module.exports = Read;