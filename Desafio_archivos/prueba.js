const Contenedor = require('./contenedor');

const ar = new Contenedor("productos");


let productos = [{
        title: "Gorra",
        price: 450,
        thumbnail: "https://ruta"
    },
    {
        title: "Camiseta",
        price: 500,
        thumbnail: "https://ruta"
    },
    {
        title: "Posillo",
        price: 300,
        thumbnail: "https://ruta"
    }
];

async function guardar(productos) {
    console.log("\n Guardando productos: ")
    let respuesta;
    for (let index = 0; index < productos.length; index++) {
        respuesta = await ar.save(productos[index]);
        console.log(respuesta)
    }
}

let i = 0;
const proceso = setInterval(() => {
    switch (i) {
        case 0:
            guardar(productos)
            break;
        case 1:
            obtenerTodos();
            break;
        case 2:
            obtenerPorId(3)
            break;
        case 3:
            eliminarPorId(3)
            setTimeout(() => {
                obtenerTodos()
            }, 100);
            break;
        case 4:
            eliminarTodos()
            setTimeout(() => {
                obtenerTodos()
            }, 100);
            break;
        case 5: 
            clearInterval(proceso)
            break;
        default:
            break;
    }
    i++;
}, 200);


function obtenerTodos() {
    console.log("\n Los productos son: ")
    ar.getAll().then(value => console.log(value));
}

function obtenerPorId(id) {
    console.log(`\n El producto con in ${id} es: `)
    ar.getById(3).then(value => console.log(value[0]));
}

function eliminarPorId(id) {
    console.log(`\n Producto eliminado`)
    ar.deleteById(id).then(value => console.log(value));
}

function eliminarTodos() {
    console.log(`\n Productos eliminados`)
    ar.deleteAll().then(value => console.log(value));
}