const { matchedData } = require("express-validator");
const {clientesModel} = require("../models")

const realizarPago = async (req, res) => {
    try {
        const { numeroCliente } = req.params;

        // Busca el cliente por el campo numeroCliente
        const cliente = await clientesModel.findOne({ numeroCliente });

        if (!cliente) {
            return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        }

        // Actualiza los campos del cliente
        cliente.fechaPago = Date.today().addMonths(1);
        cliente.status = 'Sin Adeudo';
        cliente.adeudo = false;

        // Guarda los cambios
        await cliente.save();

        res.json({ success: true, message: 'Pago realizado con éxito', cliente });
    } catch (error) {
        console.error('Error al realizar el pago:', error);
        res.status(500).json({ success: false, message: 'Error al realizar el pago' });
    }
};

const borrarCliente = async (req, res) => {
    try {
        // Obtén el número de cliente de los parámetros de la URL
        const { numeroCliente } = req.params;
        
        // Busca y elimina el cliente por el número de cliente
        const data = await clientesModel.deleteOne({ numeroCliente });

        // Si no se encuentra el cliente, responde con un error 404
        if (!data) {
            return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        }

        // Responde con éxito
        res.json({ success: true, message: 'Cliente borrado con éxito' });
    } catch (error) {
        console.log("Error al borrar al cliente", error);
        res.status(500).json({ success: false, message: 'Error al borrar al cliente' });
    }
};

const buscarPorNumeroCliente = async (req, res) => {
    try {
        const { numeroCliente } = req.params;
        // Buscar el cliente por el campo numeroCliente
        const data = await clientesModel.findOne({ numeroCliente });

        if (!data) {
            return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error("Error al buscar el cliente por número de cliente", error);
        res.status(500).json({ success: false, message: 'Error al buscar el cliente por número de cliente' });
    }
};

const buscarPorNombreCliente = async (req, res) => {
    try {
        const { nombre } = req.params;
        // Buscar el cliente por el campo nombre
        const data = await clientesModel.findOne({ nombre });

        if (!data) {
            return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error("Error al buscar el cliente por nombre de cliente", error);
        res.status(500).json({ success: false, message: 'Error al buscar el cliente por nombre de cliente' });
    }
};

/** Obtener lista de la base de datos*/
const getItems = async (req, res) => {
    try{
        const data = await clientesModel.find();
        res.status(200).json({ success: true, data});
    }catch(error){
        console.error('Error al enviar la lista de los clientes', error);
        res.status(500).json({ success: false, message: 'Hubo un error al obtener la lista de los clientes'});
    }
};

/**Obtener un detalle */
const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await clientesModel.findById(id);
        res.send({ data });
    }catch(e){
        console.log("ERROR_GET_ITEM")
    }
};

/**Crear un registro */
const createItem = async (req, res) => {
    const { body } = req
    console.log(body)
    
    try{
        const data = await clientesModel.create(body); 
        res.status(201).json({ success: true, message: 'Cliente registrado', data });
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ success: false, message: 'Hubo un error al registrar el cliente' });
    }
};

/**Actualizar un registro */
const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req);

        const data = await clientesModel.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        res.send({ data });
    } catch(e){
        console.log("ERROR_UPDATE_ITEM");
    }
};

/**Eliminar un registro */
const deleteItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await clientesModel.deleteOne({_id:id});
        res.send({ data });
    }catch(e){
        console.log("ERROR_DELETE_ITEM")
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, realizarPago, borrarCliente, buscarPorNumeroCliente, buscarPorNombreCliente }