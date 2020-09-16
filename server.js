const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload =require(`express-fileupload`)
const api = require('./server/routes/api')

const app = express()

mongoose.connect('mongodb://localhost/PaperPatrolDB',{useNewUrlParser:true, useUnifiedTopology:true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))

app.use('/public',express.static(path.join(__dirname,'dist')))
app.set('view engine','ejs')


app.use(fileUpload())



app.use('/',api)

const port = 3030
app.listen(port,function(){
    console.log(`Up and running on port ${port}`)
})