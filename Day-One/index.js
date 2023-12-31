require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const userAuth = require("./routes/auth");
const productAdd = require("./routes/product");
const bodyParser = require("body-parser");
const allDataRoute = require("./routes/allData");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.TOKEN_SERVER_PORT || 5000;

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookieParser());

const dbURL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@auth.s8xiojc.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, console.log("Server running on port " + port));
  })
  .catch((err) => console.log(err));

app.use("/api", userAuth);
app.use("/api", productAdd);
app.use("/api", allDataRoute);