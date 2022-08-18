//import de "express"
const express = require("express")
const mongoose = require('mongoose')
const fs = require('fs')


//body-parser
var bodyParser = require('body-parser')

//importation des routes "product et user" 
const productRoutes = require("./Routes/product") 
const userRoutes = require("./Routes/user") 
const categoryRoutes = require("./Routes/categorie")
const orderRoutes = require("./Routes/orders")
const authRoutes = require("./Routes/auth")
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

app.use('/product', productRoutes)
app.use('/category', categoryRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)







//app.listen(8080,()=>console.log("votre appli est dispo sur 8080"))