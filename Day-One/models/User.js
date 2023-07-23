const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 60000, // Code will expire after 10 minutes (600 seconds)
    default: Date.now,
  },
  code: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
