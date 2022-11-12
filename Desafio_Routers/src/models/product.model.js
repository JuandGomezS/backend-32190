
class Product  {

    constructor(fileName) {
        this.products = [];
    }

    /**
     * Async Method to get all products
     * @returns Array of products or object
     */
    getAll() {
        return this.products;
    }

    /**
     * Async Method to get product by id
     * @param {number} id Id of element to find
     * @returns Object
     */
    getById(id) {
        let product = this.products.filter(product => product.id == id);
        if (this.products.length == 0 || product.length == 0) return [{
            error: 1,
            message: "Product not found",
            status: 400
        }];
        return product;
    }


    /**
     * Async Method to save product
     * @param {object} object 
     * @returns object
     */
    save(object) {

        object.id = this.products.length > 0 ? parseInt(this.products.at(-1).id + 1) : 1;

        try {
            this.products.push(object);
            return object;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Async method to delete product by id
     * @param {number} id 
     * @returns 
     */
    deleteById(id) {
        const response = {}
        let index = this.products.findIndex(product => product.id == id);

        if (index < 0) {
            response.error = 1;
            response.message = "Product not found";
            response.status = 400;
            return response;
        }
        
        try {
            this.products = this.products.filter(product => product.id != id);
            response.error = 0,
            response.message = `The product with id: ${id} has been deleted `;
        } catch (error) {
            response.error = 1;
            response.message = "Task could not be completed";
            response.status = 400;
        }

        return response
    }

    updateProduct(id, body) {
        let index = this.products.findIndex((product) => product.id == id);

        if (index < 0) {
            const object = {
                error: 1,
                message: "Product not found",
                status: 400
            };
            return object;
        }

        this.products[index] = {
            title: body.title ? body.title : this.products[index].title,
            price: body.price ? body.price : this.products[index].price,
            thumbnail: body.thumbnail ? body.thumbnail : this.products[index].thumbnail,
            id: this.products[index].id
        };

        return this.products[index];
    }
}

module.exports = Product;