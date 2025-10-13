const { Router } = require("express");
const {
  crearProfesor,
  listarProfesores,
  obtenerProfesor,
  actualizarProfesor,
  eliminarProfesor,
} = require("../controllers/profesorController");

const {
  registrarPago,
  obtenerPagosProfesor,
} = require("../controllers/pagoProfesorController");

const router = Router();

router.post("/", crearProfesor);
router.get("/", listarProfesores);
router.get("/:id", obtenerProfesor);
router.put("/:id", actualizarProfesor);
router.delete("/:id", eliminarProfesor);
router.post("/:id/pagos", registrarPago);
router.get("/:id/pagos", obtenerPagosProfesor);

module.exports = router;
