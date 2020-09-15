const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')
//const axios  = require('axios') 

const app = express()

mongoose.connect('mongodb://localhost/WeatherDB',{useNewUrlParser:true, useUnifiedTopology:true})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))



app.use('/',api)

const port = 3000
app.listen(port,function(){
    console.log(`Up and running on port ${port}`)
})