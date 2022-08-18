const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },

  fullName: {
    type: String,
    trim: true,
    required: true,
  },

  hash_password: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },

  IsAdmin: {
    type: Boolean,
  },
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
