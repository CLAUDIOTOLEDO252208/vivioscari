const { Router } = require("express");
const {
  listarTodosPagos,
  obtenerDetallePago,
  actualizarPago,
  eliminarPago,
} = require("../controllers/pagoProfesorController");

const router = Router();

router.get("/", listarTodosPagos);
router.get("/:id", obtenerDetallePago);
router.put("/:id", actualizarPago);
router.delete("/:id", eliminarPago);

module.exports = router;
