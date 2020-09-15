const express = require('express')
const axios = require('axios')
const Market = require('../model/Market')
const User = require('../model/User')

const router = express.Router()


router.get('/insurence', function (req, res) {
    const insurenceApi = `https://data.gov.il/api/3/action/datastore_search?resource_id=6d47d6b5-cb08-488b-b333-f1e717b1e1bd`
    console.log(insurenceApi)

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
            lastUpdate
        })
        //Market.save(m)
        res.send(m)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/user/:userName',function(req,res){
    const user = req.body
    const name = user.name
    User.exists({ name }, function (err, result) {
        if (result) {
            res.send("This user already exists")
        } else {
            // const age = user.age,
            // const password = user.password,
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
                pensionCompany,
                maritalStatus,
                fullDisclosure:{monthFee,savesFee,yield,dangerLvl}
                // monthFee,
                // savesFee,
                // yield,
                // dangerLvl
            })
                // u.save()
                res.send("Wowee! new user!")
        }
    })
})






module.exports = router