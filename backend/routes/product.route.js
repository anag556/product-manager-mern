import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();
export default router;

router.get("/", getProducts); // get all the info about all the products

router.post("/", createProduct); // create a new product

router.put("/:id", updateProduct); // update an existing product corresponding to the given id

router.delete("/:id", deleteProduct); // delete an existing product corresponding to the given id