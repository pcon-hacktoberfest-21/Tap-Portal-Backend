require("dotenv").config()
const PORT = process.env.PORT

const express = require("express")
const app = express()

app.listen(PORT,()=>{
    console.log(`Listening at post ${PORT}`)
})