// //funciona ok ultima modificacion
// const { Router } = require("express");
// const {
//   listarTodosPagos,
//   obtenerDetallePago,
//   actualizarPago,
//   eliminarPago,
// } = require("../controllers/pagoProfesorController");

// const router = Router();

// router.get("/", listarTodosPagos);
// router.get("/:id", obtenerDetallePago);
// router.put("/:id", actualizarPago);
// router.delete("/:id", eliminarPago);

// module.exports = router;

const { Router } = require("express");
const {
  listarTodosPagos,
  obtenerDetallePago,
  actualizarPago,
  eliminarPago,
  obtenerHistorialProfesor, // 👈 NUEVO
  obtenerResumenTodosProfesores, // 👈 NUEVO
} = require("../controllers/pagoProfesorController");

const router = Router();

// Listar todos los pagos
router.get("/", listarTodosPagos);

// 🔥 NUEVO: Resumen de todos los profesores
router.get("/resumen-profesores", obtenerResumenTodosProfesores);

// 🔥 NUEVO: Historial completo de un profesor
router.get("/historial/:id", obtenerHistorialProfesor);

// Obtener detalle de un pago
router.get("/:id", obtenerDetallePago);

// Actualizar pago
router.put("/:id", actualizarPago);

// Eliminar pago
router.delete("/:id", eliminarPago);

module.exports = router;
