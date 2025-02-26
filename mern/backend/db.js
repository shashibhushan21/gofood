const mongoose = require('mongoose');
require ('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const connectDB = async ()=>{
    try {
        await mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        // process.exit(1); 
      }
}

module.exports = connectDB;
