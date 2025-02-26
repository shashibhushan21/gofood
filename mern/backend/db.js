const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://gofood:gofood1234@cluster0.anhs6.mongodb.net/gofoodDB"

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
