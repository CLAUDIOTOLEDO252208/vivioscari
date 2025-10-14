const { Schema, model } = require("mongoose");

const GastoSchema = Schema({
  concepto: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    enum: [
      "servicios",
      "mantenimiento",
      "insumos",
      "salarios",
      "impuestos",
      "otro",
    ],
    default: "otro",
  },
  descripcion: {
    type: String,
  },
  fecha_gasto: {
    type: Date,
    default: Date.now,
  },
  comprobante: {
    type: String, // URL o número de comprobante
  },
  estado: {
    type: String,
    enum: ["pagado", "pendiente", "cancelado"],
    default: "pagado",
  },
});

module.exports = model("Gastos", GastoSchema);
