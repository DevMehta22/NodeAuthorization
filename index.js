const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/router')
require("dotenv").config()
const app = express()
app.use(express.json())
app.use('/api/user',routes)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connnected to DB!");
    const port = process.env.PORT || 5500
    app.listen(port,(err)=>{
        if (err) throw err;
        console.log(`server running on port ${port}`);
    })
})
.catch((err)=>{
    console.log(err.message);
})

