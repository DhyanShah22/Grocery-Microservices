const mongoose = require('mongoose')

const Schema = mongoose.Schema

const custModel = new Schema ({
    customerName: {
       type: String,
       required: true, 
    },
    customerOrder: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Customer', custModel)