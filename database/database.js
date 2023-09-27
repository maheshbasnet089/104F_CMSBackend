const mongoose = require("mongoose")


exports.connectDatabase = async()=>{
    // connecting to database 
// jaba samma database sanga connect hudainw wait gar
 await mongoose.connect("mongodb+srv://hello:hello@cluster0.b2xxyug.mongodb.net/?retryWrites=true&w=majority")
 console.log("Database connected successfully")
}