const express = require('express')
const router = express.Router()

const Subjective = require('../mongo/subjectiveModal')

router.post('/', (req, res) => {
    const {body} = req
    const subjective = new Subjective(body);

    subjective.save(function (err) {
        if (err){
            console.log(err);
            res.status(400).json('err')
        }
        else {
            res.status(201).json(subjective._id)
        }
    })
})

router.get('/:id', (req, res) => {
    const _id = req.params.id
    Subjective.findOne({_id}, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json('err')
        } else {
            res.json(result)
        }
    })
})

router.put('/:id', (req, res) => {
    const _id = req.params.id

    Subjective.update({_id}, req.body, (err) => {
        if (err) {
            console.log(err)
            res.status(400).json('err')
        } else {
            res.status(204).end()
        }
    })
})

router.delete('/:id', (req, res) => {
    const _id = req.params.id
    Subjective.remove({_id}, (err) => {
        if (err){
            console.log(err)
            res.status(404).json(err)
        } else {
            res.status(204).end()
        }
    })
})

router.get('/all/:ids', (req, res) => {
    console.log(req.params.ids)

    const ids = req.params.ids.split(',')

    Subjective.find({_id: {'$in': ids}}, (err, results) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(results)
        }
    })
})

module.exports = router

