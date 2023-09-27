const mongoose = require('mongoose')

const Schema = mongoose.Schema

const grocerySchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Manufacturer: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Grocery', grocerySchema)