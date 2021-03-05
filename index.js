require("dotenv").config()
const PORT = process.env.PORT || 3000;
const schedule= require('node-schedule')
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
const adminAuth = require('./routes/admin/adminRouter')
const studentQuery= require('./routes/students/student')
//using routes
app.use('/student',studentAuth);
app.use('/studentQuery',studentQuery);
app.use('/admin',adminAuth);



// importing database content

// schedule job to inform student about companies
const updateStudentAboutCompaney=require('./utils/updateStudentAboutCompanies')
schedule.scheduleJob('*/10 * * * * *',async ()=>{
    console.log("i ran guyes.....");
    await updateStudentAboutCompaney(1);
})



app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})