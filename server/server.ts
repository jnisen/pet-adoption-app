const express = require('express')
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors')
const app = express()
const cookieparser = require('cookie-parser')

import {connectDB} from './config/mongodb'
const port = process.env.PORT || 8000

connectDB();

const usersRoute = require('./routes/usersRoute')
const petsRoute = require('./routes/petsRoute')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,   
}

app.use(cookieparser())
app.use(express.json({extension: false}))
app.use(cors(corsOptions))

app.use('/users', usersRoute)
app.use('/pets', petsRoute)


app.listen(port, () => { console.log(`Listening on port: ${port}`) })