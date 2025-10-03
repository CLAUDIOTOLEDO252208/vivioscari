const { Schema, model } = require("mongoose");

const TurnoSchema = Schema({
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  id_clase: {
    type: Schema.Types.ObjectId,
    ref: "Clases",
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: String,
    required: true,
  },
  horaFin: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ["Activo", "Cancelado"],
    default: "Activo",
  },
});

module.exports = model("Turnos", TurnoSchema);
