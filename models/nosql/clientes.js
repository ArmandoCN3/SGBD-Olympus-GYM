const mongoose = require("mongoose");
const datejs = require("datejs");

const ClienteScheme = new mongoose.Schema(
    {
        numeroCliente: {
            type: Number
        },
        nombre: {
            type: String,
            unique: true
        },
        fechaIngreso: {
            type: Date, default: Date.today(),
            unique: false
        },
        fechaPago: {
            type: Date, default: Date.today().addMonths(1)
        },
        status: {
            type: String, default: ("Sin Adeudo"),
            unique: false
        },
        adeudo: {
            type: Boolean, default: false,
            unique: false
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
);

// Middleware para asignar automáticamente el número de cliente antes de guardar
ClienteScheme.pre('save', async function (next) {
    if (!this.numeroCliente) {
        // Si el número de cliente no está definido, asignar automáticamente uno
        const ultimoCliente = await this.constructor.findOne({}, {}, { sort: { numeroCliente: -1 } });
        const nuevoNumeroCliente = ultimoCliente ? Math.max(ultimoCliente.numeroCliente + 1, 100) : 100;
        this.numeroCliente = nuevoNumeroCliente;
    }
    next();
});

// Índice único para numeroCliente
ClienteScheme.index({ numeroCliente: 1 }, { unique: true });

module.exports = mongoose.model("clientes", ClienteScheme);
