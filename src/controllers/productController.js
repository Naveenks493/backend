const productModel = require("../models/productModel");

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, rating, price } = req.body;

    const product = new productModel({
      name,
      rating,
      price,
      image: req.file ? `/uploads/${req.file.filename}` : null, // store file path7
    });

    await product.save();
    res.status(201).send({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).send({ message: "Error while creating product", error });
  }
};

// Get all products
const showallProduct = async (req, res) => {
  try {
    const showproduct = await productModel.find();
    res.status(200).send({ product: showproduct });
  } catch (error) {
    res.status(500).send({ message: "Error while fetching product", error });
  }
};

// Get product by ID
const showProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const showproductbyid = await productModel.findById(id);
    res.status(200).send({ product: showproductbyid });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while fetching product by id", error });
  }
};

// Update product (with optional image replacement)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, price } = req.body;

    const updateFields = { name, rating, price };

    if (req.file) {
      updateFields.image = `/uploads/${req.file.filename}`;
    }

    const updateproduct = await productModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(200).send({ message: "Product updated", product: updateproduct });
  } catch (error) {
    res.status(500).send({ message: "Error while updating product", error });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteproduct = await productModel.findByIdAndDelete(id);
    res.status(200).send({
      message: "Product deleted successfully",
      product: deleteproduct,
    });
  } catch (error) {
    res.status(500).send({ message: "Error while deleting product", error });
  }
};

module.exports = {
  createProduct,
  showProductById,
  showallProduct,
  updateProduct,
  deleteProduct,
};
