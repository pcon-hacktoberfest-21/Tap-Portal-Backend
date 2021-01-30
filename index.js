require("dotenv").config()
const PORT = process.env.PORT | 8000;

const express = require("express")
const app = express()

// importing database content
const db= require('./db')

//requiring routes
const studentAuth = require('./routes/students/auth')

//using routes
app.use('/student',studentAuth);


// only for testiong
//var logger = require('./utils/logger')
// app.get('/',(req,res)=>{
//     var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
//    logger("user loged in","2029UGCS999",ip).then(res.send("hello"))
   
// })



app.listen(PORT,()=>{
    console.log(`Listening at post ${PORT}`)
})