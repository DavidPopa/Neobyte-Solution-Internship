const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  service: "gmail",
  auth: {
    user: "davidpopa843@gmail.com",
    pass: "btlbqemydxaolfrl",
  },
});

function generateRandomCode(number) {
  const minDigit = 0;
  const maxDigit = 9;
  const codeSet = new Set();

  while (codeSet.size < number) {
    const randomDigit = Math.floor(Math.random() * (maxDigit - minDigit + 1));
    const lastDigit = [...codeSet][codeSet.size - 1];
    // lastdigit transforma totul in array apoi ia ultima cifra
    if (codeSet.size === 0 || Math.abs(lastDigit - randomDigit) !== 1) {
      codeSet.add(randomDigit);
      // vf daca cifra actuala cu urmatoarea au dif !=1
    }
  }

  return [...codeSet].join("");
}

router.post("/create-account", async (req, res) => {
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
    const dataCode = generateRandomCode(6);
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

    // Set the generated code and createdAt timestamp before saving the user
    isUser.code = dataCode;
    isUser.createdAt = new Date();
    await isUser.save();

    res.status(200).json({
      error: false,
      name: isUser.name,
      email: isUser.email,
      userId: isUser._id,
      dataCode: dataCode, // Use dataCode here, not isUser.dataCode
      message: "Logged in successfully",
    });

    sendEmailWithCode(email, dataCode);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.post("/verify-code", async (req, res) => {
  const { code } = req.body;
  const existedCode = await User.findOne({ code });
  if (!existedCode) {
    res.status(404).json({ error: true, message: "Message does no existed" });
  }
  if (code === existedCode.code) {
    res.status(200).json({ message: "Code is good", isCode: true });
    console.log("Works on my machine");
  }
});
// router.get("/allData", async (req, res) => {
//   try {
//     const database = client.db("test");
//     const collection = database.collection("customers");

//     const users = await collection.find({}).toArray();

//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Error fetching customers:", err);
//     res.status(500).json({ error: true, message: "Internal Server Error" });
//   }
// });
function sendEmailWithCode(email, code) {
  const mailOptions = {
    from: email,
    to: "davidpopa843@gmail.com",
    subject: "2FA Code",
    text: `Your verification code is: ${code}, it will be available only 10 mnutes`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Failed to send email:", error);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = router;
