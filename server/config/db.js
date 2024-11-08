// server/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Loads .env from the root directory

const db = process.env.mongoURI;
console.log('Mongo URI:', process.env.mongoURI);
console.log('JWT Secret:', process.env.JWT_SECRET);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;