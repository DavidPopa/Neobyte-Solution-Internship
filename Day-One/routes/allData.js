const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

let indexCreationInProgress = false;

const createIndexes = async () => {
  try {

    await mongoose.connection.db.collection("customers").createIndex({
      "First Name": 1,
      "Last Name": 1,
      Company: 1,
      City: 1,
      Country: 1,
      "Subscription Date": 1,
      Website: 1,
    });
    console.log("Index created successfully!");
  } catch (err) {
    console.error("Error creating indexes:", err);
  }
};

router.get("/data", async (req, res) => {
  try {
    if (!indexCreationInProgress) {
      indexCreationInProgress = true;
      await createIndexes();
      indexCreationInProgress = false;
    }

    const selectedOption = req.query.option;
    const inputValue = req.query.value;

    const filter = { [selectedOption]: inputValue };
    const projection = {
      "First Name": 1,
      "Last Name": 1,
      Company: 1,
      City: 1,
      Country: 1,
      "Subscription Date": 1,
      Website: 1,
    };

    // Limitare resultatele
    const limit = 10;

    // Sort crescator
    const sort = { [selectedOption]: 1 };

    const customers = await mongoose.connection.db
      .collection("customers")
      .find(filter)
      .project(projection)
      .limit(limit)
      .sort(sort)
      .toArray();

    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
