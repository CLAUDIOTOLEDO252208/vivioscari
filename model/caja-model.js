const { Schema, model } = require("mongoose");

const CajaSchema = Schema({
  tipo: {
    type: String,
    enum: ["ingreso", "egreso"],
    required: true,
  },
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
    enum: ["pago_clase", "pago_profesor", "gasto_operativo", "otro"],
    required: true,
  },
  referencia_id: {
    type: Schema.Types.ObjectId,
    // No ponemos ref porque puede ser de diferentes colecciones
  },
  referencia_tipo: {
    type: String,
    enum: ["Pago", "PagoProfesor", "Gasto", "Otro"],
  },
  observaciones: {
    type: String,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuario_registro: {
    type: String,
    default: "Administrador",
  },
});

module.exports = model("Caja", CajaSchema);
