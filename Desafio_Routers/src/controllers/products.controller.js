const Product = require('../models/product.model');
const bd = new Product();

function getAllProducts(req, res) {
    let response = bd.getAll();
    res.json(response)
}

function saveProduct(req, res) {
    res.json(bd.save(req.body))
}

function getProductById (req, res) {
    const { id } = req.params;
    let response = bd.getById(id)[0];
    sendResponse(req, res, response);
}


function removeProduct (req, res){
    const { id } = req.params;
    const response = bd.deleteById(id)
    sendResponse(req, res, response);
}

function updateProduct(req, res){
    const { id } = req.params;
    const response = bd.updateProduct(id, req.body)
    sendResponse(req, res, response);
}

function sendResponse(req, res, response){
    res.status(response.error ? response.status : 200)
    delete response.status
    res.json(response)
}


module.exports = {
    getAllProducts,
    getProductById,
    saveProduct,
    removeProduct,
    updateProduct
};