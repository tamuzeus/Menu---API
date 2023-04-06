import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGODB_URL ? process.env.MONGODB_URL : '';
const mongoose = require('mongoose')

async function main() {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Menu"
    );
    console.log("Connected to the database!")
  } catch (error) {
    console.log(`Erro: ${error}`)
  };
}

module.exports = main;