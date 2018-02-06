const mongoose = require('mongoose')

const Schema = mongoose.Schema

const basicQuiz = new Schema({
    title: String,
    basicType: String,
    answer: String,
    options: [String]
});

module.exports = mongoose.model('basicQuiz', basicQuiz)