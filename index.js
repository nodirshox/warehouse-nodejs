require('dotenv').config();

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();

// Database
mongoose.connect(
    process.env.DB,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
}).on('error', (error) => {
    console.log(`There is an error in connecting database: ${error}`);
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', require('./api/index.js'));


app.use((err, req, res, next) => {
    console.log('environment ' + app.get('env'));
    console.log('Error: ', err.message);
    res.status(err.status || 500).json({
        result: 'error',
        message: err.message
    });
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server stared on http://localhost:${port}`);
});