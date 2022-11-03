const Contenedor = require('../models/contenedor');
const ar = new Contenedor("productos");

async function getAll(req, res) {
    let productos = await ar.getAll();
    res.json(productos)
}

async function getById (req, res) {
    let productos = await ar.getAll();
    let idR =  Math.floor((Math.random() * (productos.length - 1 + 1)) + 1);
    let producto = await ar.getById(idR);
    res.json(producto[0]);
}

module.exports = {
    getAll,
    getById
};