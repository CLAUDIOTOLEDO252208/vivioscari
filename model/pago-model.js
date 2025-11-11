const { Schema, model } = require("mongoose");

const PagoSchema = Schema({
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  // ❌ Clase ya no es obligatoria
  id_clase: {
    type: Schema.Types.ObjectId,
    ref: "Clases",
    required: false,
  },
  tipoPago: {
    type: String,
    enum: ["Mensual", "Por clase", "Cuenta corriente"],
    required: true,
  },
  formaPago: {
    type: String,
    enum: ["Efectivo", "Transferencia", "Débito", "Crédito"],
    required: true,
  },
  valorMensual: {
    type: Number,
    required: false, // definido en el pago
  },
  valorPorClase: {
    type: Number,
    required: false,
  },
  montoPagado: {
    type: Number,
    required: true,
  },
  saldo: {
    type: Number,
    default: 0,
  },
  fechaPago: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ["Pagado", "Pendiente"],
    default: "Pagado",
  },
});

module.exports = model("Pagos", PagoSchema);
