const {default: mongoose} = require('mongoose')
const express = require('express')

const Business = require('../Models/busSchema')

const getBusinesss = async (req,res) => {
    const business = await Business.find({}).sort({ createdAt: -1})

    return res.status(200).json(business)
}

const getSingleBusiness = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const business = await Business.findById(id)

    if(!business)
    {
        return res.status(404).json({Error: 'No such medicine available'})
    }

    res.status(200).json(business)
}

const addBusiness = async (req,res) => {
    const {CustomerName, CustomerID, GroceryName, GroceryID, Quantity, orderDate} = req.body 

    try{
        const business = await Business.create({CustomerName, CustomerID, GroceryName, GroceryID ,Quantity, orderDate})
        res.status(201).json(business)
    }
    catch(error) {
        return res.status(400).json("error")
    }
}

const updateBusiness = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const business = await Business.findOneAndUpdate({_id: id}, req.body, {
        runValidators: true,
        new: true
    })

    if(!business)
    {
        return res.status(404).json({Error: 'No such medicine available'})
    }

    res.status(200).json(business)
}

const deleteBusiness = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const business = await Business.findOneAndDelete({_id: id})

    if(!business)
    {
        return res.status(404).json({Error: 'No such medicine available'})
    }

    res.status(200).json(business)
}

module.exports = {
    getBusinesss,
    getSingleBusiness,
    addBusiness,
    updateBusiness,
    deleteBusiness
}