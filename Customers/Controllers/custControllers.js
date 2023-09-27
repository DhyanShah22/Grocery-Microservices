const express = require('express')
const {default: mongoose} = require('mongoose')

const Customer1 = require('../Models/custSchema')

const getCustomer = async (req,res) => {
    try{
    const customer = await Customer1.find({}).sort({ createdAt: -1})
    res.status(200).json(customer)
    }
    catch(error) {
        return res.status(400).json(error)
        //console.log(error)
    }
}

const getSingleCustomer = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const customer = await Customer1.findById(id)

    if(!customer)
    {
        return res.status(404).json({Error: 'No such customer available'})
    }

    res.status(200).json(customer)
}

const addCustomer = async (req,res) => {
    const {customerName, customerOrder, Quantity} = req.body
    try {
        const customer = await Customer1.create({customerName, customerOrder, Quantity})
        res.status(200).json(customer)
    }
    catch(error) {
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}

const updateCustomer = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const customer = await Customer1.findOneAndUpdate({_id: id}, req.body, {
        runValidators: true,
        new: true
    })

    if(!customer)
    {
        return res.status(404).json({Error: 'No such customer available'})
    }

    res.status(200).json(customer)
}

const deleteCustomer = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const customer = await Customer1.findOneAndDelete({_id: id})

    if(!customer)
    {
        return res.status(404).json({Error: 'No such customer available'})
    }

    res.status(200).json(customer)
}

module.exports = {
    getCustomer,
    getSingleCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
}