const mongoose = require("mongoose");
const datejs = require("datejs");
const {clientesModel} = require("../models");

async function verificarPagos() {
    try {
      // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener todos los clientes de la base de datos
    const clientes = await clientesModel.find();

    // Iterar sobre cada cliente y verificar el estado de pago
    clientes.forEach(async (cliente) => {
      // Comparar la fecha actual con la fecha de pago del cliente
      if (fechaActual > cliente.fechaPago && cliente.status !== "Con Adeudo") {
        // Actualizar el estado y el campo de adeudo
        await clientesModel.findByIdAndUpdate(
          cliente._id,
          { $set: { status: "Con Adeudo", adeudo: true } },
          { new: true }
        );

        console.log(`Cliente ${cliente.nombre} con adeudo`);
      }
    });

    console.log('Verificación de pagos completada');
    } catch (error) {
      console.error('Error al verificar pagos:', error);
    }
  }
  
  module.exports = verificarPagos;