const { Schema, model } = require("mongoose");

const CierreCajaSchema = Schema({
  fecha_cierre: {
    type: Date,
    default: Date.now,
  },
  periodo: {
    fecha_inicio: {
      type: Date,
      required: true,
    },
    fecha_fin: {
      type: Date,
      required: true,
    },
  },
  totales: {
    ingresos: {
      type: Number,
      required: true,
    },
    egresos: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    cantidad_movimientos: {
      type: Number,
      default: 0,
    },
  },
  detalles_por_categoria: {
    type: Map,
    of: {
      ingresos: Number,
      egresos: Number,
    },
  },
  detalles_por_forma_pago: {
    efectivo: { type: Number, default: 0 },
    transferencia: { type: Number, default: 0 },
    tarjeta: { type: Number, default: 0 },
    otro: { type: Number, default: 0 },
  },
  arqueo: {
    efectivo_sistema: { type: Number, default: 0 },
    efectivo_fisico: { type: Number, default: 0 },
    diferencia: { type: Number, default: 0 },
    transferencia_sistema: { type: Number, default: 0 },
    transferencia_fisica: { type: Number, default: 0 },
    diferencia_transferencia: { type: Number, default: 0 },
  },
  observaciones: {
    type: String,
  },
  usuario_cierre: {
    type: String,
    default: "Administrador",
  },
  estado: {
    type: String,
    enum: ["abierto", "cerrado"],
    default: "cerrado",
  },
});

module.exports = model("CierreCaja", CierreCajaSchema);
