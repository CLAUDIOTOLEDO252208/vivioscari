// const { Schema, model } = require("mongoose");

// const ClaseSchema = Schema({
//   nombre_clase: {
//     type: String,
//     required: true,
//   },
//   descripcion: {
//     type: String,
//   },
//   dias: {
//     type: [String],
//   },
//   horarios: {
//     type: [String],
//   },
//   capacidad: {
//     type: Number,
//     default: 10,
//   },
//   estado: {
//     type: Boolean,
//     default: true,
//   },
// });

// module.exports = model("Clases", ClaseSchema);
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
  // 🆕 NUEVO: Tipo de clase
  tipo_clase: {
    type: String,
    enum: ["regular", "paquete_8", "paquete_12"],
    default: "regular",
  },
  // 🆕 NUEVO: Cantidad de sesiones si es paquete
  cantidad_sesiones: {
    type: Number,
    default: null,
  },
  // 🆕 NUEVO: Precio del paquete
  precio: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Clases", ClaseSchema);
