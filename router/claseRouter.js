// const { Router } = require("express");
// const {
//   listarClases,
//   crearClase,
//   actualizarClase,
//   eliminarClase,
// } = require("../controllers/claseController");
// const router = Router();

// // Rutas públicas
// router.get("/", listarClases);

// // Rutas admin
// router.post("/", crearClase);
// router.put("/:id", actualizarClase);
// router.delete("/:id", eliminarClase);

// module.exports = router;
const { Router } = require("express");
const {
  listarClases,
  crearClase,
  actualizarClase,
  eliminarClase,
  crearClasePaquete8,
  crearClasePaquete12,
  listarClasesRegulares,
  listarPaquetes,
} = require("../controllers/claseController");

const router = Router();

// ✅ Rutas originales que siguen funcionando
router.get("/", listarClases); // Lista TODAS las clases (regulares y paquetes)
router.post("/", crearClase); // Crear clase regular
router.put("/:id", actualizarClase);
router.delete("/:id", eliminarClase);

// 🆕 NUEVAS rutas para paquetes
router.post("/paquete-8", crearClasePaquete8); // Crear clase con 8 sesiones
router.post("/paquete-12", crearClasePaquete12); // Crear clase con 12 sesiones
router.get("/regulares", listarClasesRegulares); // Solo clases regulares
router.get("/paquetes", listarPaquetes); // Solo paquetes (8 y 12 sesiones)

module.exports = router;
