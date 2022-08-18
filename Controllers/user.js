var mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt");

const User = require("../Models/user")

exports.register = function (req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

    newUser.save(function (err, user) {
        if (!err) {
            user.hash_password = undefined;
            return res.json(user)
        } else {
            return res.status(400).send({

                message: err,
            })
        }
    })
}

exports.requireAuth = (req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, "RESTFULAPIs", (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next()
        }
        )
    } else {
        req.user = undefined
        next()
    }
}

exports.IsAuth = function (req,res,next){
    if(req.user){
        next()
    }else{
        return res.status(401).json({ message: "Unauthorizd user!!" })
    }
}

exports.sign_in = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;

        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({
                message: "Authentification failed. Invalid user or password",
            })
        }

        const token = jwt.sign(
            { email: user.email, fullName: user.fullName, _id: user._id },
            "RESTFULAPIs"
        )

        return res.json({
            token
        })
    })
}                     