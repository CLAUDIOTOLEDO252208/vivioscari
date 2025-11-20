const { Router } = require("express");
const {
  listarClases,
  crearClase,
  actualizarClase,
  eliminarClase,
  crearClasePaquete8,
  crearClasePaquete12,
  crearClasePaquete8Fijo, // 🆕 Nuevo
  crearClasePaquete12Fijo, // 🆕 Nuevo
  listarClasesRegulares,
  listarPaquetes,
} = require("../controllers/claseController");

const router = Router();

// ✅ Rutas originales
router.get("/", listarClases);
router.post("/", crearClase);
router.put("/:id", actualizarClase);
router.delete("/:id", eliminarClase);

// Paquetes flexibles
router.post("/paquete-8", crearClasePaquete8);
router.post("/paquete-12", crearClasePaquete12);

// 🆕 Paquetes con días fijos
router.post("/paquete-8-fijo", crearClasePaquete8Fijo);
router.post("/paquete-12-fijo", crearClasePaquete12Fijo);

// Filtros
router.get("/regulares", listarClasesRegulares);
router.get("/paquetes", listarPaquetes);

module.exports = router;
