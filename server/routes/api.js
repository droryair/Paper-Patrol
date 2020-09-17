const express = require('express')
const axios = require('axios')
const Market = require('../model/Market')
const User = require('../model/User')
const Results = require('../model/Results')
const fs = require('fs')
const DefaultPension = require('../Class/DefaultPension')

router = express.Router()  

router.get('/getUser',function(req,res){
    const id = req.query.id
    User.findById({_id:id},function(err,user){
        res.send(user)
    })
})

router.post('/finalPage',function(req,res){
    const result = req.body
    console.log(result)
    const r = new Results({
        userPension: result["userPension"],
        benchmark: result["benchmark"],
        bestOffer: result["bestOffer"]
    })
    r.save()
    res.redirect(`/userResult/?id=${r._id}`)
})
router.get('/userResult', function (req, res) {
    const id = req.query.id
    Results.findById({ _id: id })
    .then(results => {
        res.render('finalPage.ejs',results,function(err, html) {
            res.send(html);
        })

//,results
    }).catch(err => {
        console.log(err)
    })
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
            const avgYield = calcAvg(yieldArr)
            const avgMonthFee = calcAvg(monthArr)
            const avgSavesFee = calcAvg(savesArr)

            const m = new Market({
                avgMonthFee,
                avgSavesFee,
                avgYield,
            })
            m.save()
            res.send(m)
            
        })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/userInfo',function(req,res){
    const id = req.query.id
    User.findById({_id:id})
    .then(user=>{
        res.render('userInfo.ejs', {
            name: user.name,
            age: user.age,
            maritalStatus: user.maritalStatus,
            id
        })
    }).catch(err=>{
        console.log(err)
    })
})


router.post('/user', function (req, res) {
    const user = req.body
    const file = req.files.fullDisclosure
    
    
    const name = user.name
    const age = user.age
    const maritalStatus = user.maritalStatus
    const path = `./${file.name}`
    let fullDisclosure
    file.mv("./" + file.name, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("file uploaded")
            // fullDisclosure = Parse.Module(path)

            // * This will delete our PDF file *
            try {
                fs.unlinkSync(path)
            }
            catch (err) { console.log(err) }
            // *

        }
    })
    


    const u = new User({
        name,
        age,
        maritalStatus,
        fullDisclosure
    })
    u.save()
    res.redirect(`/userInfo/?id=${u._id}`)
    res.end()
})


router.get('/results/:id', function (req, res){
    const userID = req.params.id
    let userAge 
    let userOffer
    // const defaultPensionYoung = new DefaultPension ("AltshulerShaham", 1.49, 0.1)
    // const defaultPensionOld = new DefaultPension ("MeitavDash", 2.49, 0.05)
    const defaultPensionYoung ={name:"AltshulerShaham",monthFee:1.49,savesFee:0.1}
    const defaultPensionOld ={name:"MeitavDash",monthFee:2.49,savesFee:0.05}
    User.findById({userID}).then(u=> {
        userAge = u.age
        userOffer = u.fullDisclosure
        if((userAge<45)&&(defaultPensionYoung.monthFee<userOffer.monthFee)){
            res.send(`your Better offer is:${defaultPensionYoung}`)
        }else if((userAge>45)&&(defaultPensionOld.savesFee<userOffer.savesFee)){
            res.send(`your Better offer is:${defaultPensionOld}`)
        }else {
            res.send(`your offer is good enough. congratulations!`)
        }
    })
    .catch(err=>{
        res.send(err)
    })


    

})

module.exports = router