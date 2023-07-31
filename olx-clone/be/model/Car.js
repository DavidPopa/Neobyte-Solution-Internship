const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
  },
  year: {
    type: Number,
  },
  km: {
    type: Number,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
