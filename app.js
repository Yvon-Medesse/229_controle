const express = require("express")
const mongoose = require('mongoose')

var bodyParser = require('body-parser')
const userRoutes = require('./Routes/user')
const authRoutes = require('./Routes/auth')
const havestRoutes = require('./Routes/havest')


const { requireAuth } = require("./Controllers/user")

require('dotenv').config()

let app = express()
mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(process.env.PORT, ()=> console.log('votre appli est dispo sur le port 8083')))
    .catch((err)=>console.log(err))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/havest", havestRoutes)