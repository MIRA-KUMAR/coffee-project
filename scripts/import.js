const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const { MongoClient } = require('mongodb');
const { resolve } = require('path');
const { rejects } = require('assert');
const { exit } = require('process');

const readCsv = () => new Promise((resolve, rejects) => {
    const filepath = path.join(__dirname, '../Dataset.csv');
    const finalData = [];
    fs.createReadStream(filepath)
        .pipe(csv.parse({headers: true}))
        .on('data', function(data){
            finalData.push({
                name: data['title'],
                type: data['coffee_type'].length === 0 ? null : data['coffee_type'].split(','),
                rating: parseFloat(data['rating']),
                reviews: parseInt(data['reviews']),
                seller: data['seller_name'],
                price: parseFloat(data['price']),
                weight: parseFloat(data['weight_formatted_to_gramms'])
            });  
        })
        .on('end', function() {
            return resolve(finalData);
            
        })
        .on('error', function(err) {
            return rejects(err);
        })
} )
async function importData() {
   
    try {
        const data = await readCsv();
        // console.log(data);
        // console.log('Done!');
        
        // 1. Creating a connection to DB
        const connection = await MongoClient.connect('mongodb://localhost:27017/coffee');
        const db = connection.db();

        // 2. Creating collections 
        const CoffeeCollections = db.collection('coffeeName');
        const TypeCollections = db.collection('coffeeType');
        const SellerCollections = db.collection('coffeeSeller');

        const uniqueTypes = data.map((x) => x.type)
                                .flat()                                                             // To convert into a single array
                                .filter((x, i, a)=> a.indexOf(x) === i);
        
        const uniqueCoffee = data.map((x) => x.name)
                                .flat()                                                             // To convert into a single array
                                .filter((x, i, a)=> a.indexOf(x) === i);
                        
        const uniqueSeller = data.map((x) => x.seller)
                                .flat()
                                .filter((x, i, a) => a.indexOf(x) === i)
        // console.log(uniqueTypes);

        const typeData = uniqueTypes.map((type) => {
            return {
                name: type, 
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const coffeeData = uniqueCoffee.map((coffee) => {
            return {
                name: coffee,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const sellerData = uniqueSeller.map((seller) => {
            return {
                name: seller,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        // 3. Insert into collections

        await TypeCollections.insertMany(typeData);
        await CoffeeCollections.insertMany(coffeeData);
        await SellerCollections.insertMany(sellerData);
        console.log('Inserted to DB!')
    }
        catch(err) {
            console.log(err);
        }
    
    
};

importData();
