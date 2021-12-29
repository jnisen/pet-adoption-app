const app = require('./server')
const port = process.env.PORT || 8000
const dotenv = require("dotenv");
dotenv.config();

import { connectDB } from './config/mongodb'

const run = async () => {
    try {
        await connectDB();
        app.listen(port, () => { console.log(`Listening on port: ${port}`) })
    } catch (e) {
        console.log(`Error connecting`)
    }
}

run()

