const { Schema, model } = require("mongoose");

const ClaseSchema = Schema({
  nombre_clase: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  dias: {
    type: [String],
  },
  horarios: {
    type: [String],
  },
  capacidad: {
    type: Number,
    default: 10,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  tipo_clase: {
    type: String,
    enum: [
      "regular",
      "paquete_8",
      "paquete_12",
      "paquete_8_fijo",
      "paquete_12_fijo",
    ],
    default: "regular",
  },
  cantidad_sesiones: {
    type: Number,
    default: null,
  },
  precio: {
    type: Number,
    default: 0,
  },
  // 🆕 NUEVO: Indicar si es con días fijos
  dias_fijos: {
    type: Boolean,
    default: false,
  },
  // 🆕 NUEVO: Días fijos asignados automáticamente (solo lectura)
  dias_fijos_asignados: {
    type: [String],
    default: [],
  },
});

module.exports = model("Clases", ClaseSchema);
