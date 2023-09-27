const express = require('express')

const {
    getBusinesss,
    getSingleBusiness,
    addBusiness,
    updateBusiness,
    deleteBusiness
} = require('../Controller/busController')

const router = express.Router()

router.get('/', getBusinesss)

router.get('/:id', getSingleBusiness)

router.post('/', addBusiness)

router.patch('/:id', updateBusiness)

router.delete('/:id', deleteBusiness)

module.exports = router
