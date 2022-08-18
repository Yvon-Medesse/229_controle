//import de "express"
const express = require("express")
const mongoose = require('mongoose')

//body-parser
var bodyParser = require('body-parser')
const userRoutes = require('./Routes/user')
const authRoutes = require('./Routes/auth')
const postRoutes = require('./Routes/post')


const { requireAuth } = require("./Controllers/user")

require('dotenv').config()

// crée le serveur "express"
let app = express()
mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(process.env.PORT, ()=> console.log('votre appli est dispo sur le port 8083')))
    .catch((err)=>console.log(err))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// utilisation des routes respectives
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/posts", postRoutes)