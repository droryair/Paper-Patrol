const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultsSchema = new Schema({
    userPension: {},
    benchmark: {},
    bestOffer: {}

})
const Results = mongoose.model("Results", resultsSchema)
module.exports = Results