const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())

const custRoutes = require('./Routes/custRoutes')
// app.use((req,res,next) => {
//     console.log(req.method, res.path)
//     next()
// })

app.use('/api/customer/business', custRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })