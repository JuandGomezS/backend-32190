const express = require("express");
const {validatorCreateProduct} = require('../validators/products.validator')

const {
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct,
    removeProduct,
} = require("../controllers/products.controller");

const PRODUCTS_ROUTER = express.Router();

PRODUCTS_ROUTER
    .get("/", getAllProducts)
    .get("/:id", getProductById)
    .post("/", validatorCreateProduct, saveProduct)
    .put("/:id", updateProduct)
    .delete("/:id", removeProduct);
 
module.exports = PRODUCTS_ROUTER;
