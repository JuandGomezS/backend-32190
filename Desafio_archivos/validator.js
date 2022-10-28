const fs = require('fs');

class validator {

    resIsset = {}

    isset (ref) { return typeof ref !== 'undefined' }

    async issetFile(path) {

        try {

            let arreglo = await fs.promises.readFile(path, 'utf-8');
            this.resIsset.error = 0
            this.resIsset.products = JSON.parse(arreglo)
            return this.resIsset;

        } catch (error) {

            this.resIsset.error = 1
            this.resIsset.products = []
            return this.resIsset;

        }
    }


    validObject(object){
        if (this.isset(object) && this.isset(object.title) && this.isset(object.price) && this.isset(object.thumbnail)) {
            return true;
        }
        return false;
    }
}

module.exports = validator