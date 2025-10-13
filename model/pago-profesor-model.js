const { Schema, model } = require("mongoose");

const PagoProfesorSchema = Schema({
  profesor: {
    type: Schema.Types.ObjectId,
    ref: "Profesores",
    required: true,
  },
  horas_trabajadas: {
    type: Number,
    required: true,
  },
  valor_hora: {
    type: Number,
    required: true,
  },
  monto_total: {
    type: Number,
    required: true,
  },
  fecha_pago: {
    type: Date,
    default: Date.now,
  },
  periodo: {
    type: String,
  },
  observaciones: {
    type: String,
  },
  estado: {
    type: String,
    enum: ["pendiente", "pagado", "cancelado"],
    default: "pagado",
  },
});

module.exports = model("PagosProfesores", PagoProfesorSchema);
