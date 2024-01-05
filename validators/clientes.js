const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ClienteScheme = require("../models/nosql/clientes");


const validatorCreateItem = [
    check("nombre")
    .exists()
    .notEmpty(),
    (req,res,next) => validateResults(req,res,next)
]

const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req,res,next) => validateResults(req,res,next)
]   

module.exports = { validatorCreateItem,validatorGetItem };