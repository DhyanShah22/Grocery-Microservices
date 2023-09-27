const express = require('express')

const {
    getCustomer,
    getSingleCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
} = require('../Controllers/custControllers')

const router = express.Router()

router.get('/', getCustomer)

router.get('/:id', getSingleCustomer)

router.post('/', addCustomer)

router.patch('/:id', updateCustomer)

router.delete('/:id', deleteCustomer)

module.exports = router