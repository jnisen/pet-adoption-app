var express = require('express');
var cors = require('cors');
var app = express();
var cookieparser = require('cookie-parser');
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
module.exports = app;
