const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    age:Number,
    maritalStatus:String,
    // pensionCompany,
    // password,
    // fullDisclosure:{monthFee,savesFee,yield,dangerLvl}
})
const User = mongoose.model("User", userSchema)
module.exports = User