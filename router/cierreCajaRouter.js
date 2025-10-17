const { Router } = require("express");
const {
  obtenerDatosParaCierre,
  realizarCierre,
  listarCierres,
  obtenerCierre,
  eliminarCierre,
  verificarCierreHoy,
} = require("../controllers/cierreCajaController");

const router = Router();

router.get("/datos-cierre", obtenerDatosParaCierre);
router.post("/", realizarCierre);
router.get("/", listarCierres);
router.get("/verificar-hoy", verificarCierreHoy);
router.get("/:id", obtenerCierre);
router.delete("/:id", eliminarCierre);

module.exports = router;
