const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homeworkQuiz = new Schema({
    title: String,
    stack: String
});

module.exports = mongoose.model('homeworkQuiz', homeworkQuiz)