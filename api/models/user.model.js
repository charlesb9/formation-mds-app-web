const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  roles: [String],
  avatar: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
