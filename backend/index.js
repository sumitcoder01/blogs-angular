require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
//Connect To MongoDB
try {
    connectToMongo();
    console.log("Connect to Database  Successfully");
} catch (error) {
    console.error(error.message);
    res.status(500).json({success:false,error:"Internal Server Error"});
}


//Creating Node APP at Given Port(default 8000) 
const app = express();
const port = process.env.PORT || 8000;

//Middlewares
app.use(cors());
app.use(express.json());



//Listen App At port 5000
app.listen(port, () => {
    console.log(`Blog backend listening at http://localhost:${port}`);
})