require('dotenv').config();

var express = require("express");
var router = require('./routes/index');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));


// Database
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
mongoose.connection.once('open', () => {
    console.log('Connected to database');
}).on('error', (error) => {
    console.log(`There is an error in connecting database: ${error}`);
});


app.set('views', 'views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);


var port = 8000;
app.listen(port, () => {
    console.log('Server stared');
});