// router/usuarioRouter.js
const { Router } = require("express");
const { listarUsuarios } = require("../controllers/usuarioController");

const router = Router();

// ✅ Listar todos los usuarios
router.get("/", listarUsuarios);

module.exports = router;
