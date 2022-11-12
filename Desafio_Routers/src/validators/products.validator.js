const {check} = require('express-validator');
const validationResults = require('../handlers/handle.validator')


const validatorCreateProduct = [
    check("title").exists().notEmpty().isString(),
    check("price").exists().notEmpty().isDecimal(),
    check("thumbnail").exists().notEmpty().isString().isURL(),
    (req, res, next) => validationResults(req, res, next)
]

module.exports = {validatorCreateProduct};