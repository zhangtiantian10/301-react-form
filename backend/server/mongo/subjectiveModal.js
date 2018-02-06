const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subjective = new Schema({
    title: String
})

module.exports = mongoose.model('subjective', subjective)