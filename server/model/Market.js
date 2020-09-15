const mongoose = require('mongoose')
const Schema = mongoose.Schema

const marketSchema = new Schema({
	avgMonthFee: Number,
	avgSavesFee: Number,
	avgYield: Number
})
const Market = mongoose.model("Market", marketSchema)
module.exports = Market