require('dotenv').config();
const connectToMongo = require('./db');
const { blogs, users } = require('./constants/constant');
const express = require('express');
const cors = require('cors');
//Connect To MongoDB
try {
    connectToMongo();
} catch (error) {
    console.error(error.message);
}

//Creating Node APP at Given Port(default 8000) 
const app = express();
const port = process.env.PORT || 8000;

//Middlewares
app.use(cors());
app.use(express.json());

//user routes
users.forEach(userRoute => {
    app.use(`/api/users/${userRoute}`, require(`./routes/users/${userRoute}`));
});

//blog routes
blogs.forEach(blogRoute => {
    app.use(`/api/blogs/${blogRoute}`, require(`./routes/blogs/${blogRoute}`));
});

//Listen App At port 5000
app.listen(port, () => {
    console.log(`Blog backend listening at http://localhost:${port}`);
})