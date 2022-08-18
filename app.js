//import de "express"
const express = require("express")
const mongoose = require('mongoose')

//body-parser
var bodyParser = require('body-parser')
const authRoutes = require('./Routes/auth')
const havestRoutes = require('./Routes/havest')


const { requireAuth } = require("./Controllers/user")

require('dotenv').config()

// crée le serveur "express"
let app = express()
mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(process.env.PORT, ()=> console.log('votre appli est dispo sur le port 8080')))
    .catch((err)=>console.log(err))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// utilisation des routes respectives
app.use("/auth", authRoutes)
app.use("/havest", havestRoutes)