const fs = require('fs');

class validator {

    /**
     * Method to validate non undefined
     * @param {any} ref 
     * @returns boolean
     */
    isset(ref) {
        return typeof ref !== 'undefined'
    }

    /**
     * Method to validate that FileName's directory exist
     * @param {string} path 
     * @returns object
     */
    async issetFile(path) {
        const resIsset = {}
        try {
            let arreglo = await fs.promises.readFile(path, 'utf-8');
            resIsset.error = 0
            resIsset.products = JSON.parse(arreglo)
            return resIsset;
        } catch (error) {
            resIsset.error = 1
            resIsset.products = []
            return resIsset;
        }
    }

    /**
     * Method to validate the structure of object
     * @param {object} object 
     * @returns boolean
     */
    validObject(object) {
        if (this.isset(object) && this.isset(object.title) && this.isset(object.price) && this.isset(object.thumbnail)) {
            return true;
        }
        return false;
    }
}

module.exports = validator