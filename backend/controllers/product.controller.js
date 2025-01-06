import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
} // get all the info about all the products

export const createProduct = async(req, res) => {
    const product = req.body; //data from user

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create Product:",error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
} // create a new product

export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }
    
    try {
        const UpdatedProduct = await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({success: true, data: UpdatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message:"Server Error"});
    }
} // update an existing product corresponding to the given id

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
} // delete an existing product corresponding to the given id