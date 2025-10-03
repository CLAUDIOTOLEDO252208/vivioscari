// controllers/usuarioController.js
const Usuario = require("../model/usuario-model");

// ✅ Listar todos los usuarios (sin contraseñas)
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.json({ usuarios });
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  listarUsuarios,
};
