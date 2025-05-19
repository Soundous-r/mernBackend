const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');


const app =express();
const cors = require("cors");
app.use(cors());

//middleware
app.use(express.json());
app.use(morgan('dev')); // for logging requests in the console

//routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));
//port
const port = process.env.PORT || 7666; 

app.use((req,res)=>{
    res.send("API is running")
})

//connect to db
const connectDB = require('./config/DBconnect');
connectDB();
//listen port
app.listen (port, () => {
    console.log(`server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
})
