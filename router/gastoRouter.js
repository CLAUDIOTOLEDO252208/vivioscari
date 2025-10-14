const { Router } = require("express");
const {
  crearGasto,
  listarGastos,
  obtenerGasto,
  actualizarGasto,
  eliminarGasto,
} = require("../controllers/gastoController");

const router = Router();

router.post("/", crearGasto);
router.get("/", listarGastos);
router.get("/:id", obtenerGasto);
router.put("/:id", actualizarGasto);
router.delete("/:id", eliminarGasto);

module.exports = router;
