const mongoose = require("mongoose");
const Car = require("./Car");
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
  cars: [Car.schema], // Embed the Car schema as an array of subdocuments
});

const User = mongoose.model("User", userSchema);

module.exports = User;
