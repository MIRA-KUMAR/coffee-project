const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const axios = require('axios');

const {MongoClient, ObjectId} = require('mongodb');
// const { exit } = require('process');

(async function main() {

    const connection = await MongoClient.connect('mongodb://localhost:27017/coffee');
    const db = connection.db();

    // const NameCollection = db.collection('coffeeNames');
    // const TypeCollection = db.collection('coffeeTypes');
    // const SellerCollection = db.collection('coffeeSellers');
    // const CoffeeDataCollection = db.collection('coffeeInformations');

    const singularNames = {
        'coffeeNames': 'coffeeName',
        'coffeeTypes': 'coffeeType',
        'coffeeSellers': 'coffeeSeller',
        'coffeeInformations': 'coffeeInformation',
    }
    const d = await Promise.all ([
        'coffeeNames',
        'coffeeTypes',
        'coffeeSellers',
        'coffeeInformations'
    ].map(async (name)=> {
        const Collection = db.collection(name);
        const data = await Collection.find().toArray();
        const esData = data.map((obj) => {
            const {_id, ...rest} = obj;
            return [
                JSON.stringify({index: {_id: _id}}),
                JSON.stringify(rest)
            ];
        }).flat().join('\n');

        const resp = await axios.post(`http://localhost:9200/${ singularNames[name] }/_bulk`, esData + '\n', {
            headers: {
                'Content-Type': 'application/x-ndjson'
            }
        });
        // console.log(resp.data)
        return resp.data;
    })
    );
    console.log(d);
    
})()