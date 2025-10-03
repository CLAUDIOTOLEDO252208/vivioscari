const { Router } = require("express");
const {
  listarClases,
  crearClase,
  actualizarClase,
  eliminarClase,
} = require("../controllers/claseController");
const router = Router();

// Rutas públicas
router.get("/", listarClases);

// Rutas admin
router.post("/", crearClase);
router.put("/:id", actualizarClase);
router.delete("/:id", eliminarClase);

module.exports = router;
