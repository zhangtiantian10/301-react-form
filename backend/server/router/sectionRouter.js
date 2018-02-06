const express = require('express')
const router = express.Router()

const Section = require('../mongo/sectionModal')

router.post('/', (req, res) => {
    const {body} = req
    const section = new Section(body);

    section.save(function (err) {
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
    const _id = req.params.id
    Section.findOne({_id}, (err, result) => {
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

    Section.update({_id}, req.body, (err) => {
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
    Section.remove({_id}, (err) => {
        if (err){
            console.log(err)
            res.status(404).json(err)
        } else {
            res.status(204).end()
        }
    })
})

module.exports = router

