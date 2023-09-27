const express = require('express')
const {default: mongoose} = require('mongoose')
require('dotenv').config()
const axios = require('axios')

const app = express()

app.use(express.json())

const Business = require('./Models/busSchema')

const busRoutes = require('./Routes/busRoutes')
// app.use((req,res,next) => {
//     console.log(req.method, res.path)
//     next()
// })

app.use('/api/business', busRoutes)

app.get('/api/grobus/:id', async (req,res) => {
    const { id } = req.params 

    const business = await Business.findById(id)
    if(business) {
        axios.get('http://localhost:9000/api/customer/business/' + business.CustomerID).then((response) => {
            var orderObject = {customerName: response.data.customerName, quantity: response.data.Quantity}

            axios.get('http://localhost:8000/api/grocery/' + business.GroceryID).then((response) => {
                orderObject.GroceryName = response.data.Name
                res.json(orderObject)
                console.log('Successfully added.')
            })
        })
    }else {
        res.send('Invalid Order')
    }
})

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })