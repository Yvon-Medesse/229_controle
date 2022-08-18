const mongoose = require("mongoose");

const havestSchema = new mongoose.Schema({
  publish_at: {
    type: Date,
    default: Date.now,
  },

  habest_date: {
    type: Date,
  },

  content: {
    type: String,
  },

  title: {
    type: String,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },

  price: {
    type: Number,
  },

  status: {
    type: String,
    enum: ["draft", "publish", "pending"],
  },
});

const havest = mongoose.model("havest", havestSchema);

module.exports = havest;
