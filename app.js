//import de "express"
const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config()
//body-parser
let bodyParser = require("body-parser");

//importation des routes "product et user"
const authRoutes = require("./Routes/auth");
const havestRoutes = require("./Routes/havest");

// crée le serveur "express"
let app = express();

 mongoose
  .connect(process.env.MONGO_URI)
  .then((result) =>
    app.listen(process.env.PORT, () => console.log("votre appli est dispo sur 8081"))
  )
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// utilisation des routes respectives
app.use("/auth", authRoutes);
app.use("/havest", havestRoutes);





