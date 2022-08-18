const mongoose = require("mongoose");
(jwt = require("jsonwebtoken")), (bcrypt = require("bcrypt"));

const User = require("../Models/User");

const register = function (req, res) {
  let newUser = new User(req.body);

  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

  newUser.save(function (err, user) {
    if (!err) {
      user.hash_password = undefined;
      return res.json(user);
    } else {
      return res.status(400).send({
        message: err,
      });
    }
  });
};

const sign_in = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err;

    if (!user || !user.comparePassword(req.body.password)) {
      return res
        .status(401)
        .json({
          message: "Authentification failed . Invalid user or password",
        });
    }

    const token = jwt.sign({
     
        email: user.email, fullName: user.fullName, _id: user._id },
        "RESTFULAPIs"
      );
    

    return res.json({
      token,
    });
  });
};


module.exports = {register , sign_in}
