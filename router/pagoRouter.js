// // router/pagoRouter.js
// const { Router } = require("express");
// const {
//   registrarPago,
//   listarPagosPorUsuario,
//   listarTodosLosPagos,
// } = require("../controllers/pagoController");

// const router = Router();

// // Registrar un pago (solo admin)
// router.post("/", registrarPago);

// // Listar pagos por usuario (estado de cuenta)
// router.get("/usuario", listarPagosPorUsuario);

// // Listar todos los pagos (admin)
// router.get("/", listarTodosLosPagos);

// module.exports = router;
// router/pagoRouter.js

// //funciona ok ultima modificacion
// const { Router } = require("express");
// const {
//   registrarPago,
//   listarPagosPorUsuario,
//   listarTodosLosPagos,
//   editarPago,
//   eliminarPago,
// } = require("../controllers/pagoController");

// const router = Router();

// // Registrar un pago
// router.post("/", registrarPago);

// // Listar pagos por usuario
// router.get("/usuario", listarPagosPorUsuario);

// // Listar todos los pagos (admin)
// router.get("/", listarTodosLosPagos);

// // Editar pago
// router.put("/:id", editarPago);

// // Eliminar pago
// router.delete("/:id", eliminarPago);

// module.exports = router;
const { Router } = require("express");
const {
  registrarPago,
  listarPagosPorUsuario,
  listarTodosLosPagos,
  editarPago,
  eliminarPago,
  obtenerEstadoCuentaAlumno, // 👈 NUEVO
  listarAlumnosConSaldo, // 👈 NUEVO
} = require("../controllers/pagoController");

const router = Router();

// Registrar un pago
router.post("/", registrarPago);

// Listar pagos por usuario
router.get("/usuario", listarPagosPorUsuario);

// Listar todos los pagos (admin)
router.get("/", listarTodosLosPagos);

// 🔥 NUEVO: Estado de cuenta de un alumno
router.get("/estado-cuenta/:id", obtenerEstadoCuentaAlumno);

// 🔥 NUEVO: Listar alumnos con saldo pendiente
router.get("/alumnos-con-saldo", listarAlumnosConSaldo);

// Editar pago
router.put("/:id", editarPago);

// Eliminar pago
router.delete("/:id", eliminarPago);

module.exports = router;
