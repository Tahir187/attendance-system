const mongoose = require("mongoose");

async function dbConnection(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection successfull to DB");
    } catch (error) {
        console.log('Error connecting to DB');
    }
}

dbConnection();