const express = require('express')
const router = express.Router()

const HomeworkQuiz = require('../mongo/homeworkQuizModal')

router.post('/', (req, res) => {
    const {body} = req
    const homeworkQuiz = new HomeworkQuiz(body);

    homeworkQuiz.save(function (err) {
        if (err){
            console.log(err);
            res.status(400).json('err')
        }
        else {
            res.status(200).end()
        }
    })
})

router.get('/:id', (req, res) => {
    const _id = req.path.slice(1)
    HomeworkQuiz.findOne({_id}, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

router.get('/', (req, res) => {
    console.log('123----------')

    HomeworkQuiz.find({}, (err, results) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(results)
        }
    })
})

module.exports = router

