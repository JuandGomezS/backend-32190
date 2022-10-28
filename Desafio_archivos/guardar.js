//import {archivo} from './clase.js'
const archivo = require('./clase');

const ar = new archivo();

let object = {
    title: "gorra",
    price: "450",
    thumbnail: "https://ruta"
}

ar.save(object).then(value => {
    console.log(value);
});