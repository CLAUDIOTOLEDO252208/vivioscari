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
//     type: [String], // Ej: ["Lunes", "Miércoles", "Viernes"]
//   },
//   horarios: {
//     type: [String], // Ej: ["08:00", "10:00", "18:00"]
//   },
//   capacidad: {
//     type: Number,
//     default: 10, // cantidad máxima de alumnos por clase
//   },
//   estado: {
//     type: Boolean,
//     default: true,
//   },
// });

// module.exports = model("Clases", ClaseSchema);
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
//   precio: {
//     type: Number,
//     required: true, // 👈 obligatorio para el cálculo de pagos
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
});

module.exports = model("Clases", ClaseSchema);
