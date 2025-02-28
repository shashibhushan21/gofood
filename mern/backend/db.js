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
        
        const foodCollection = mongoose.connection.db.collection("food");
        const fetched_data = await foodCollection.find({}).toArray();
        global.food_items = fetched_data;
        // console.log(fetched_data);

      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        // process.exit(1); 
      }

     

        // try {
        //     const fetched_data = mongoose.connection.db.collection("food");
        //     fetched_data.find({}).toArray(function(error, data) {
        //         if(error)console.log("connection error",error);
        //         else console.log(data,fetched_data);
        //     });
        // }catch{
        //     console.log("somting went wrong");
        // }
   
     
    }

module.exports = connectDB;
