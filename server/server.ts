const express = require('express')

const cors = require('cors')
const app = express()
const cookieparser = require('cookie-parser')





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


module.exports = app