const express = require('express')
const axios = require('axios')
// const Parser = require('body-parser')
const Market = require('../model/Market')
const User = require('../model/User')
const Module = require('../../parse-module')
const fileUpload =require(`express-fileupload`)

// const Parser = require('Module')
const router = express.Router()
router.use(fileUpload())
router.get(`/`, (req,res) => {
        res.sendFile(__dirname + `/index.html`)
})

router.post('/', (req,res) => {
    if(req.files) {
        const filename = req.files
        // file.mv('./uploads'+filename, function(err){
        //     if(err){
        //         res.send(err)
        //     }else{
        //         res.send(`${filename} uploaded`)
        //     }
        // })
        console.log(filename)
    }
})

router.get('/insurence', function (req, res) {
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
            //Market.save(m)
            res.send(m)
        })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/user/:userName',function(req,res){
    console.log("hello")
    console.log(req.files.fullDisclosure)
    const user = req.body
    const fullDisclosure = req.files
    fullDisclosure.mv("../../uploads/" + fullDisclosure.name, function(err){
        if(err){
            console.log(err)
        } else{
            console.log("File uploaded")
        }
    })
    
    const name = user.name

    User.exists({ name }, function (err, result) {
        if (result) {
            res.send("This user already exists")
        } else {
            const age = user.age
            const password = user.password
            // const pensionCompany = user.pensionCompany,
            // const maritalStatus = user.maritalStatus,
            // const monthFee = user.monthFee,
            // const savesFee = user.savesFee,
            // const yield = user.yield
            // // const dangerLvl = user.dangerLvl
            const u = new User({
                name,
                age,
                password,
                // pensionCompany,
                // maritalStatus,
                // fullDisclosure:{monthFee,savesFee,yield,dangerLvl}
                // monthFee,
                // savesFee,
                // yield,
                // dangerLvl
            })
                // u.save()
                console.log(u)
            }
        })
        res.send("Wowee! new user!")
})

router.post('/parser', function (req, res) {
    const path = req.body
    // console.log("path!",path)
    // Module.func(path)
    // console.log(Module)

    // const path = 'C:\Users\97252\OneDrive\שולחן העבודה'
    const result = Module.Module(path.path)
        // console.log(result)
        res.send(result)
    
    // res.send(Module)
})





module.exports = router