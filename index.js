require('dotenv').config();

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
const logger = require("./config/logger");

var app = express();

// Database
logger.info("Starting server");

mongoDBUrl = process.env.DB;

console.log(mongoDBUrl)

logger.info("Connecting to db " + mongoDBUrl);

mongoose.connect(
    mongoDBUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (err) {
        logger.error(
            "There is an error in connecting db (" +
            mongoDBUrl +
            "): " +
            err.message
        );
        }
    }
);
mongoose.connection.once("open", function () {
    logger.info("Connected to the databasee");
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', require('./api/index.js'));


app.use((err, req, res, next) => {
    console.log('environment ' + app.get('env'));
    logger.error("Error: " + err.message);
    console.log('Error: ', err.message);
    res.status(err.status || 500).json({
        result: 'error',
        message: err.message
    });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server stared on http://localhost:${port}`);
});