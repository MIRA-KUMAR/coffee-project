const express = require('express');
const morgan = require('morgan');

const app = express();

app.listen('3000', function() {                 // Callback function -- after listening to port 3000, function() is executed
    console.log('Server started');
});

app.use('/', function(req, res) {
    res.send('Hello World');
})