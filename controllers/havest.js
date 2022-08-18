const mongoose = require("mongoose");
const havest = require("../Models/havest");

//middleware 
const havestById = async (req, res, next) => {
  try {
    const havests = await havest.findOne({ _id: req.params.id });

    if (!havests) {
      return res.status(404).json({ error: "recolte not found" });
    }
    req.havest = havests;
    next();
  } catch (error) {
    return res.status(404).json({ error: "recolte not found" });
  }

  next();
};

//liste des publication 
const gethavest = async (req, res) => {
  const havests = await havest.find().populate("user");
  res.send(havest);
};

//details publication
const getDetails = async (req, res) => {
  res.send(req.havest);
};

//modifier 
const updatehavest = async (req, res) => {
  console.log(req.havest);
  try {
    if (req.body.habest_date) {
      req.havest.habest_date = req.body.habest_date;
    }
    if (req.body.content) {
      req.havest.content = req.body.content;
    }
    if (req.body.title) {
      req.havest.title = req.body.title;
    }
    if (req.body.user) {
      req.havest.user = req.body.user;
    }
    if (req.body.price) {
      req.havest.price = req.body.price;
    }
    await req.havest.save();
    res.send(req.havest);
  } catch (error) {
    res.status(404);
    res.send({ error: "recolte doesn't exist" });
  }
};

//publier
const createhavest = async (req, res) => {
    if (!req.body.user) {
      return res.status(400).json({ error: "user is required" });
    }
    const havests = await havest.create({
      habest_date: req.body.habest_date,
      content: req.body.content,
      title : req.body.title,
      user : req.body.user,
      price : req.body.price
    });
    await havests.populate("category")
    res.send(havests);
  };

  //supprimer 
  const removehavest = async (req, res) => {
    try {
      const havests = await havest.deleteOne({ _id: req.params.id });
      res.status(204).send(havests);
    } catch (error) {
      res.status(404);
      res.send({ error: "recolte doesn't exist" });
    }
  };

module.exports = { havestById, gethavest, getDetails, updatehavest , createhavest , removehavest};
