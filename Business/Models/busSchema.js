const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const busSchema = new Schema ({
    CustomerName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    CustomerID :{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    GroceryName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    GroceryID :{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    Quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Business', busSchema)