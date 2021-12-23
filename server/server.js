"use strict";
exports.__esModule = true;
var express = require('express');
var dotenv = require("dotenv");
dotenv.config();
var cors = require('cors');
var app = express();
var cookieparser = require('cookie-parser');
var mongodb_1 = require("./config/mongodb");
var port = process.env.PORT || 8000;
mongodb_1.connectDB();
var usersRoute = require('./routes/usersRoute');
var petsRoute = require('./routes/petsRoute');
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cookieparser());
app.use(express.json({ extension: false }));
app.use(cors(corsOptions));
app.use('/users', usersRoute);
app.use('/pets', petsRoute);
app.listen(port, function () { console.log("Listening on port: " + port); });
