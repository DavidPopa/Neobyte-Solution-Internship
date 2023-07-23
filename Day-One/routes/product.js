const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    res.status(200).json({ message: "Success", products: products });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});
// standard routes api !!!
router.post("/add-product", async (req, res) => {
  const { name, price, category } = req.body;
  if (name === "" || name === undefined) {
    return res.status(400).json({ message: "Must have a name" });
  }
  if (price === "" || price === undefined) {
    return res.status(400).json({ message: "Must have a price" });
  }
  if (category === "" || category === undefined) {
    return res.status(400).json({ message: "Must have a category" });
  }
  try {
    const product = new Product({ name, price, category });
    await product.save();
    console.log(product);
    return res.status(201).json({
      message: "Product successfully added",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating account",
    });
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  const productId = req.params.id; // Get the product ID from the URL parameters

  try {
    // Find the product by its ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      // If the product with the given ID doesn't exist, return a 404 error
      return res.status(404).json({ message: "Product not found" });
    }

    // If the product exists, delete it from the database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
