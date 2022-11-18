const express = require('express');
const morgan = require('morgan');
const readCoffeeInfo = require('./CoffeeInformation/read')
const app = express();


// middlewares
app.use(express.json());
app.use(morgan('dev'));

//routing
app.get('/coffeeInformation', readCoffeeInfo);

app.listen('3000', function() {                 // Callback function -- after listening to port 3000, function() is executed
    console.log('Server started');
});

// app.use('/', function(req, res) {
//     res.send('Hello World');
// })

