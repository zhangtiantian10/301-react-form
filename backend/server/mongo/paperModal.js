const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paper = new Schema({
    name: String,
    description: String,
    sections: [{
        sectionType: String,
        title: String,
        definition: {
            quizzes: [String],
            easy: Number,
            normal: Number,
            hard: Number
        }
    }]
})

module.exports = mongoose.model('paper', paper)