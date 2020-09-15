const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    age: Date,
    password: String,
    pensionCompany: String,
    maritalStatus: String,
    fullDisclosure:{}
    // monthFee: Number,
    // savesFee: Number,
    // yield: Number,
    // danger: String
})
const User = mongoose.model("User", userSchema)
module.exports = User