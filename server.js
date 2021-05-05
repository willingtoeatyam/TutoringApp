const express = require('express');
const connectDB = require('./db');
const constDB = require('./db');
require('dotenv').config();
const { PORT } = process.env;

connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.status(200).json({ message: "Welcome to the Tutoring App" }));

app.listen(PORT, ()=> console.log(`${PORT} is being listened upon`))