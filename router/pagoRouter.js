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
const { Router } = require("express");
const {
  registrarPago,
  listarPagosPorUsuario,
  listarTodosLosPagos,
  editarPago,
  eliminarPago,
} = require("../controllers/pagoController");

const router = Router();

// Registrar un pago
router.post("/", registrarPago);

// Listar pagos por usuario
router.get("/usuario", listarPagosPorUsuario);

// Listar todos los pagos (admin)
router.get("/", listarTodosLosPagos);

// Editar pago
router.put("/:id", editarPago);

// Eliminar pago
router.delete("/:id", eliminarPago);

module.exports = router;
