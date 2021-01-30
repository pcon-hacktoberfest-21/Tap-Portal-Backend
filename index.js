require("dotenv").config()
const PORT = process.env.PORT

const express = require("express")
const app = express()


// importing database content
var db= require('./db')





app.listen(PORT,()=>{
    console.log(`Listening at post ${PORT}`)
})