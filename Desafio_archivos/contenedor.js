const fs = require('fs');
const validator = require('./validator');


class Contenedor extends validator {

    constructor(fileName) {
        super();
        this.pathFile = `./data/${fileName}.txt`;
    }

    /**
     * Async Method to get all products
     * @param {boolean} toSave Parameter to define response according to use
     * @returns Array of products or object
     */
    async getAll(toSave = false) {
        const issetFile = await this.issetFile(this.pathFile);
        if (!issetFile.error) {
            return issetFile.products.length > 0 ? issetFile.products : (toSave ? [] : {
                error: 1,
                message: "No products stored"
            });
        } else {
            const response = {
                error: 1,
                message: `Directory ${this.pathFile} doesn't exits`
            }
            return response;
        }
    }

    /**
     * Async Method to get product by id
     * @param {number} id Id of element to find
     * @returns Object
     */
    async getById(id) {
        const data = await this.getAll(true);
        let product = data.filter(product => product.id == id);
        if (data.length == 0 || product.length == 0) return {
            error: 1,
            message: "Product not found"
        };
        return product;
    }


    /**
     * Async Method to save product
     * @param {object} object 
     * @returns object
     */
    async save(object) {
        const response = {
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
            response.error = 0,
                response.message = `The product has been saved with id: ${object.id}`;
        } catch (error) {
            throw new Error(error);
        }

        return response;
    }

    /**
     * Async method to delete all products of fileName
     * @returns object
     */
    async deleteAll() {
        const response = {}
        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify([], null, "\t"));
            response.error = 0;
            response.message = "Products have been removed"
        } catch (error) {
            response.error = 1;
            response.message = "Task could not be completed";
        }
        return response;
    }


    /**
     * Async method to delete product by id
     * @param {number} id 
     * @returns 
     */
    async deleteById(id) {
        const response = {}
        let data = await this.getAll(true);
        let index = data.findIndex(product => product.id == id);

        if (index < 0) {
            response.error = 1;
            response.message = "Task could not be completed, product not found";
            return response;
        }

        data = data.filter(product => product.id != id);

        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, "\t"));
            response.error = 0,
                response.message = `The product with id: ${id} has been deleted `;
        } catch (error) {
            response.error = 1;
            response.message = "Task could not be completed";
        }
        return response
    }
}

module.exports = Contenedor;