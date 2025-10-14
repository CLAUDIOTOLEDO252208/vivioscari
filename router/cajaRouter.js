const { Router } = require("express");
const {
  obtenerMovimientos,
  obtenerBalance,
  registrarIngreso,
  registrarEgreso,
  eliminarMovimiento,
  obtenerResumenPeriodo,
} = require("../controllers/cajaController");

const router = Router();

router.get("/", obtenerMovimientos);
router.get("/balance", obtenerBalance);
router.get("/resumen", obtenerResumenPeriodo);
router.post("/ingreso", registrarIngreso);
router.post("/egreso", registrarEgreso);
router.delete("/:id", eliminarMovimiento);

module.exports = router;
