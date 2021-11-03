const express = require('express');
const app = express();
const authRoute = require('./routes/auth');

//variable d'environement
require('dotenv').config();

//connection to db
require('./config/db')

//body parser
app.use(express.json());

//MIDDLEWARE
app.use('/user',authRoute)

//listin
app.listen(3000,()=> console.log(`RUNNING AT PORT ${process.env.PORT} `))