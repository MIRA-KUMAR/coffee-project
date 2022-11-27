const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

require('./models');
const routes = require('./routes');

// middlewares
app.use(express.json());
app.use(morgan('dev'));


//this will go to routes page whatever be the request(get, post....)
app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/coffee', (err) => {
    if (err){
        console.log(err);
        process.exit(1); 
    }
    app.listen(3000, function() {                 // Callback function -- after listening to port 3000, function() is executed
        console.log('Server started');
    });
});


