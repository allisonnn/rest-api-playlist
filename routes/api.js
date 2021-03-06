const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

router.get('/ninjas', (req, res, next) => {
    Ninja.geoNear({
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    }, {
        maxDistance: 1000000000,
        spherical: true
    }).then((ninjas) => {
        res.send(ninjas)
    })
})

router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja)
    }).catch(next)
})

router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(() => {
        Ninja.findOne({_id:req.params.id}).then((ninja) => {
            res.send(ninja)
        })
    })
})

router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({
        _id: req.params.id
    }).then((ninja) => {
        res.send(ninja)
    })
})

module.exports = router;