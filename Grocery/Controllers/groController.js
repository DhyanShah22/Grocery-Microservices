const express = require('express')
const {default: mongoose} = require('mongoose')

const Grocery = require('..//Models/groSchema')

const getGrocery = async (req,res) => {
    try{
    const grocery = await Grocery.find({}).sort({ createdAt: -1})
    res.status(200).json(grocery)
    }
    catch(error) {
        return res.status(400).json(error)
        //console.log(error)
    }
}

const getSingleGrocery = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const grocery = await Grocery.findById(id)

    if(!grocery)
    {
        return res.status(404).json({Error: 'No such grocery available'})
    }

    res.status(200).json(grocery)
}

const addGrocery = async (req,res) => {
    const {Name, Manufacturer, Quantity} = req.body
    try {
        const grocery = await Grocery.create({Name, Manufacturer, Quantity})
        res.status(200).json(grocery)
    }
    catch(error) {
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}

const updateGrocery = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const grocery = await Grocery.findOneAndUpdate({_id: id}, req.body, {
        runValidators: true,
        new: true
    })

    if(!grocery)
    {
        return res.status(404).json({Error: 'No such grocery available'})
    }

    res.status(200).json(grocery)
}

const deleteGrocery = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({Error: 'Not a vlaid DB id.'})
    }

    const grocery = await Grocery.findOneAndDelete({_id: id})

    if(!grocery)
    {
        return res.status(404).json({Error: 'No such grocery available'})
    }

    res.status(200).json(grocery)
}

module.exports = {
    getGrocery,
    getSingleGrocery,
    addGrocery,
    updateGrocery,
    deleteGrocery
}