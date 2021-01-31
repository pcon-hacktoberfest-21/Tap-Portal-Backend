require("dotenv").config()
const PORT = process.env.PORT | 3000;

const bodyParser = require('body-parser')
const express = require("express")
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// importing database content
const db= require('./db')

//requiring routes
const studentAuth = require('./routes/students/auth')
const adminAuth = require('./routes/admin/auth')

//using routes
app.use('/student',studentAuth);
app.use('/admin',adminAuth);


// only for testiong
//var logger = require('./utils/logger')
// app.get('/',(req,res)=>{
//     var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
//    logger("user loged in","2029UGCS999",ip).then(res.send("hello"))
   
// })



app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})