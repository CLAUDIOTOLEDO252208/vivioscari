// router/turnos.js
const { Router } = require("express");
const { listarMisTurnos } = require("../controllers/turno-controller");
const { validarJWT } = require("../middleware/validar-jwt"); // si usás auth

const router = Router();

router.get("/mis-turnos", validarJWT, listarMisTurnos);

module.exports = router;
