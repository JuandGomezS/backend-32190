const express = require("express");
const {getAll, getById} = require('./controllers/productos.controller');

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send('<h1 style="color:black"> Bienvenidos al Servidor Express </h1>');
});

app.get("/productos", getAll);

app.get("/productoRandom", getById);

const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});

server.on("error", (error) => console.log("Error en servidor", error));