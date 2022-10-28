const fs = require('fs');
const validator = require('./validator');


class archivo extends validator {

    pathFile = "./data/productos.txt";

    async getAll(toSave = false) {
        const issetFile = await this.issetFile(this.pathFile);
        if (!issetFile.error) {
            return issetFile.products.length > 0 ? issetFile.products : (toSave ? [] : "No products stored");
        } else {
            const response = {
                error: 1,
                message: `The products cannot be obtained`
            }
            return response
        }
    }

    async getById(id) {
        const data = await this.getAll(true);
        let product = data.filter(product => product.id == id);
        if (data.length == 0 || product.length == 0) return "Product not found";
        return product;
    }

    async save(object) {
        let response = {
            error: 1,
            message: `Error almacenando el producto`
        }

        const issetFile = await this.issetFile(this.pathFile);

        if (issetFile.error) {
            await fs.promises.writeFile(this.pathFile, '[]');
        }

        if (!this.validObject(object)) {
            response.message = "Object does not have the right structure";
            return response;
        }

        let array = await this.getAll(true);

        object.id = array.length > 0 ? parseInt(array.at(-1).id + 1) : 1;

        array.push(object);

        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify(array, null, "\t"));
            response = {
                error: 0,
                message: `The product has been saved with id: ${object.id}`
            }
        } catch (error) {
            throw new Error(error)
        }

        return response;
    }

    delete() {
        fs.unlink(this.pathFile, (error) => {
            if (error) {
                console.log("Hubo un error en el borrado del archivo");
            } else {
                console.log("Archivo borrado!");
            }
        });
    }
}

module.exports = archivo;