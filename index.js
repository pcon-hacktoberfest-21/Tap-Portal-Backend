const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const bodyParser = require('body-parser');


//import route for admin auth
const authAdmin = require('./route/authAdmin');
const adminPage = require('./route/adminPage');

//middleware for parsing body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route middleware for admin
app.use('/admin',authAdmin);
app.use('/admin-dashboard',adminPage);



app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))