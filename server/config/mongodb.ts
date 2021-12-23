const mongoose = require('mongoose')
require('dotenv').config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            console.log('DB Connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

