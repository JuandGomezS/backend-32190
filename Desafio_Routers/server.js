const express = require("express");
const PRODUCTS_ROUTER = require('./src/routers/products.router')

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send('<h1 style="color:black"> Bienvenidos al Servidor Express </h1>');
});

app.use('/form', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", PRODUCTS_ROUTER);

const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});

server.on("error", (error) => console.log("Error en servidor", error));
