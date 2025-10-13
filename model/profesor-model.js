const { Schema, model } = require("mongoose");

const ProfesorSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  domicilio: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Profesores", ProfesorSchema);
