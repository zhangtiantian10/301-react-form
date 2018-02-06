const mongoose = require('mongoose')

const Schema = mongoose.Schema

const section = new Schema({
    sectionType: String,
    title: String,
    definition: {
        quizzes: [String],
        easy: Number,
        normal: Number,
        hard: Number
    }
})

module.exports = mongoose.model('section', section)