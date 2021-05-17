const mongoose = require('mongoose');
require ('dotenv').config();
const { MONGOURL } = process.env;

//ASYNCHRONOUS
const connectDB = async() => {
    try {
        mongoose.connect(MONGOURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`Mongo DB is connected...`)

        //Seed data
    } catch (error) {
        console.error(err.message);

        process.exit(1);
    }
}

module.exports = connectDB;