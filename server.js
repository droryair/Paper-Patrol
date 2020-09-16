const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const mongoose = require('mongoose')
const api = require('./server/routes/api')
// const Module = require('./parse-module')
const fileUpload =require(`express-fileupload`)

const Market = require('./server/model/Market')
const User = require('./server/model/User')
const Parse = require('./parse-module')
const { lookupService } = require('dns')



const app = express()

mongoose.connect('mongodb://localhost/PaperPatrolDB',{useNewUrlParser:true, useUnifiedTopology:true})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))
app.use(fileUpload())


// app.use('/',api)

const port = 3000
app.listen(port,function(){
    console.log(`Up and running on port ${port}`)
})


app.get('/userInfo',function(req,res){
    // const id = req.query.id
    
    // let userPromise = User.findById({id})
    // userPromise.then(function(user){
    //     res.render("userInfo.ejs",{
    //         name: user.name,
    //         age: user.age,
    //         maritalStatus: user.maritalStatus
    //     })
    // })
    // .catch(err=>{
    //     res.send(err)
    // })
    res.render('userInfo.ejs', {
        name: "losssi",
        age: 33,
        maritalStatus: "fffff"
    })
})


app.get('/insurence', function (req, res) {
    const insurenceApi = `https://data.gov.il/api/3/action/datastore_search?resource_id=6d47d6b5-cb08-488b-b333-f1e717b1e1bd`
    
    const calcAvg = function(arr){
        let sum = 0
        arr.forEach(num=>sum+=Number(num))
        const avg = sum/arr.length
        return avg
    }
        
        axios.get(insurenceApi)
        .then(response=>{
            const data = response.data["result"]["records"]
            
            const yieldArr = []
            const monthArr = []
            const savesArr = []
            data.forEach(i=>{
                yieldArr.push(i.YEAR_TO_DATE_YIELD)
                monthArr.push(i.AVG_DEPOSIT_FEE)
                savesArr.push(i.AVG_ANNUAL_MANAGEMENT_FEE)
            })
            // const avgResults = calcAvg(yieldArr,monthArr,saveArr)
            const avgYield = calcAvg(yieldArr)
            const avgMonthFee = calcAvg(monthArr)
            const avgSavesFee = calcAvg(savesArr)

            const m = new Market({
                avgMonthFee,
                avgSavesFee,
                avgYield,
            })
            Market.save(m)
            res.send(m)
        })
    .catch(err=>{
        res.send("@@@@@error1@@@@@@@", err)
    })
})

app.post('/user', function (req, res) {
    const user = req.body
    const file = req.files.fullDisclosure
    // console.log(file)
    
    
    const name = user.name
    const age = user.age
    const maritalStatus = user.maritalStatus
    const path = `./${file.name}`
    let fullDisclosure
    file.mv("./" + file.name, function (err) {
        if (err) {
            console.log("@@@@@eroorrrr2@@@@@@@@",err)
        } else {
            console.log("file uploaded")
            fullDisclosure = Parse.Module(path)
        }
    })
         
    // const pensionCompany = user.pensionCompany
    // const password = user.password
    const u = new User({
        name,
        age,
        maritalStatus,
        fullDisclosure
        // pensionCompany,
        // password,
    })
    u.save()
    res.redirect('/userInfo')
    res.end()
})





