const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paper = new Schema({
    name: String,
    description: String,
    sections: [Number]
})

module.exports = mongoose.model('paper', paper)