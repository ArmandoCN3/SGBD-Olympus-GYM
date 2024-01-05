const express = require("express")
const router = express.Router();
const customHeader = require("../middleware/customHeader")
const { validatorCreateItem,validatorGetItem } = require("../validators/clientes")
const {getItems, getItem,createItem, updateItem, deleteItem, realizarPago, borrarCliente, buscarPorNumeroCliente, buscarPorNombreCliente} = require("../controllers/clientes");

//Maneja la solicitud de POST
router.post("/clientes", validatorCreateItem, async (req,res) => {
    const{ nombre } = req.body;
    try{
        const nuevoCliente = await createItem ({ nombre });

        console.log('Cliente registrado en la base de datos', nuevoCliente);

        res.json({ mensaje: 'Cliente registrado correctamente', cliente: nuevoCliente});
    } catch (error) {
        console.error('Error al registrar el cliente: ', error);
        res.status(500).json({mensaje: 'Error al registrar cliente'});
    }
})

// Ruta específica para realizar un pago
router.put("/pagar/:numeroCliente", realizarPago);

// Ruta específica para borrar un cliente
router.delete("/borrar/:numeroCliente", borrarCliente);

// Ruta específica para encontrar cliente con numeroCliente
router.get("/buscar/:numeroCliente", buscarPorNumeroCliente);

// Ruta específica para encontrar cliente con nombre
router.get("/buscarNombre/:nombre", buscarPorNombreCliente);

// TODO http://localhost/clientes GET,POST,DELETE,PUT
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, createItem);
router.put("/:id", validatorGetItem, updateItem);
router.delete("/:id", validatorGetItem, deleteItem);


module.exports = router
