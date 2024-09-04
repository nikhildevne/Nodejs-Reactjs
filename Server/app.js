const express = require('express');
let app = express();
let cors = require('cors')
let mongoose = require('mongoose')
require('dotenv').config()

// we can import the midleware 
// let auth = require('./midleware/authenticate')

mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json())
app.use(cors())

// app.use(auth) // we can use auth midleware in all api

app.listen(process.env.PORT,()=>{
    console.log('working port 3000')
})

app.get('/',(req,res)=>{
    res.send('hello')
})

require('./routes/getbooks')(app)

