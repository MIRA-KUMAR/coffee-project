const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const { MongoClient, ObjectId } = require('mongodb');
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
        const NameCollection = db.collection('coffeeNames');
        const TypeCollection = db.collection('coffeeTypes');
        const SellerCollection = db.collection('coffeeSellers');
        const CoffeeDataCollection = db.collection('coffeeInformations');

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
                _id: ObjectId(),
                name: type, 
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const coffeeData = uniqueCoffee.map((coffee) => {
            return {
                _id: ObjectId(),
                name: coffee,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const sellerData = uniqueSeller.map((seller) => {
            return {
                _id: ObjectId(),
                name: seller,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        // console.log(data);
        
        const newData = data.map((obj) => {
            if (Array.isArray(obj.name)) {
                obj.name = obj.name.map((coffeeName) =>
                    coffeeData.find(x => x.name === coffeeName)._id
                );
            }
            else {
                obj.name = [coffeeData.find(x => x.name === obj.name)._id]
            }
            if (Array.isArray(obj.type)) {
                obj.type = obj.type.map((typeName) => 
                    typeData.find(x => x.name === typeName)._id
                );
            }
            else {
                obj.type = [typeData.find(x => x.name === obj.type)._id]
            }
           
            if (Array.isArray(obj.seller)) {
                obj.seller = obj.seller.map((sellerName) => 
                    sellerData.find(x => x.name === sellerName)._id
                );
            }
            else {
                obj.seller = [sellerData.find(x => x.name === obj.seller)._id]
            }
           
            obj.createdAt = new Date();
            obj.updatedAt = new Date();
            return obj;
        })
        // console.log(newData);

        // 3. Insert into collections

        await TypeCollection.insertMany(typeData);
        await NameCollection.insertMany(coffeeData);
        await SellerCollection.insertMany(sellerData);
        await CoffeeDataCollection.insertMany(newData);
        console.log('Inserted to DB!')
    }
        catch(err) {
            console.log(err);
        }
    
    
};

importData();
