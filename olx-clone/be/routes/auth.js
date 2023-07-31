const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const Car = require("../model/Car");
const router = express.Router();

router.post("/createAccount", async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password too short, must be at least 6 characters long",
    });
  }
  if (name.length <= 2) {
    return res
      .status(400)
      .json({ message: "Name must have at least 2 characters" });
  }
  try {
    const isUserExisted = await User.findOne({ email });
    if (isUserExisted) {
      return res.status(400).json({ message: "This user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashPassword });
    await user.save();
    console.log(user);
    res.status(200).json({
      message: "User successfully created",
      user,
    });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({
      error: true,
      message: "Error creating account",
    });
  }
});

router.post("/logIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (!isUser)
      return res
        .status(401)
        .json({ error: true, message: "Maybe ur email/password is wrong" });

    const isVerifiedPassword = await bcrypt.compare(password, isUser.password);
    if (!isVerifiedPassword)
      return res
        .status(401)
        .json({ error: true, message: "Maybe ur email/password is wrong" });
    await isUser.save();

    res.status(200).json({
      error: false,
      name: isUser.name,
      email: isUser.email,
      userId: isUser._id,
      message: "Logged in successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addCar", upload.single("image"), async (req, res) => {
  console.log("req", req.body);
  const { userId, model, year, km, price } = req.body;
  const imageFileName = req.file.filename; // Get the filename of the uploaded image

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newCar = new Car({ model, year, km, price, image: imageFileName });
    user.cars.push(newCar);
    await user.save();
    res.status(200).json({
      message: "Car successfully added to user's collection",
      car: newCar,
    });
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).json({
      error: true,
      message: "Error adding car",
    });
  }
});

router.get("/getCars", async (req, res) => {
  const { userId, marca, year, rulaj, pret, image } = req.query;
  try {
    let query = {};

    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    const marcaLower = marca.toLowerCase();
    if (marca) {
      query["cars.model"] = { $regex: marcaLower, $options: "i" };
    }

    if (year) {
      query["cars.year"] = { $gte: parseInt(year, 10) };
    }

    if (rulaj) {
      query["cars.km"] = { $gte: parseInt(rulaj, 10) };
    }

    if (pret) {
      query["cars.price"] = { $gte: parseInt(pret, 10) };
    }
    if (image) {
      query["cars.image"] = image;
    }
    if (marca) {
      const usersWithMatchingCars = await User.find(query);
      const filteredCars = usersWithMatchingCars.reduce(
        (cars, user) => [
          ...cars,
          ...user.cars.filter((car) => car.model.toLowerCase() === marcaLower),
        ],
        []
      );
      // console.log(filteredCars);
      return res.status(200).json({ cars: filteredCars });
    }

    const usersWithCars = await User.find(query);
    const cars = usersWithCars.reduce(
      (allCars, user) => [...allCars, ...user.cars],
      []
    );
    console.log(cars);
    res.status(200).json({ cars });
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: true, message: "Error fetching cars" });
  }
});

module.exports = router;
