import { productModel } from "../../../db/model/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ message: "All Products", products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) return res.json({ message: "Can't find the Product" });
    res.json({ message: "Find Successfuly", product });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productModel.findByIdAndUpdate(id,{ ...req.body },{ new: true });

    if (!updatedProduct) return res.json({ message: "Can't Find The Product" });
    res.json({ message: "Updated Successfuly", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await productModel.insertOne(req.body);
    if (!newProduct) return res.json({ message: "Error in Adding Product" });
    res.json({ message: "Added Successfuly", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) return res.json({ message: "Can't Find The Product" });
    res.json({ message: "Deleted Successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export {
  getAllProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct
};
