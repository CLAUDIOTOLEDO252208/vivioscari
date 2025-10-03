// controllers/turno-controller.js
const Turnos = require("../model/turno-model");

const listarMisTurnos = async (req, res) => {
  try {
    const userId = req.user._id; // viene del JWT o del login
    const turnos = await Turnos.find({ id_usuario: userId })
      .populate("id_clase", "nombre_clase")
      .populate("id_usuario", "nombre_usuario email");
    res.json({ turnos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

module.exports = { listarMisTurnos };
