// const { Router } = require("express");
// const {
//   crearTurno,
//   listarTurnos,
//   listarTurnosPorUsuario,
//   cancelarTurno,
//   editarTurno,
//   eliminarTurno,
//   listarTurnosConCantidadPorClase,
// } = require("../controllers/turnoController");

// const router = Router();

// router.post("/", crearTurno);
// router.get("/", listarTurnos);
// router.get("/usuario", listarTurnosPorUsuario);
// router.get("/detallado-con-cantidad", listarTurnosConCantidadPorClase); // 🔹 NUEVO ENDPOINT
// router.put("/:id/cancelar", cancelarTurno);
// router.put("/:id", editarTurno);
// router.delete("/:id", eliminarTurno);

// module.exports = router;
const { Router } = require("express");
const {
  crearTurno,
  listarTurnos,
  listarTurnosPorUsuario,
  cancelarTurno,
  editarTurno,
  eliminarTurno,
  listarTurnosConCantidadPorClase,
  listarTurnosPorPaquete, // 🆕 Nueva función
} = require("../controllers/turnoController");

const router = Router();

// ✅ Rutas originales que siguen funcionando
router.post("/", crearTurno);
router.get("/", listarTurnos);
router.get("/usuario", listarTurnosPorUsuario);
router.get("/detallado-con-cantidad", listarTurnosConCantidadPorClase);
router.put("/:id/cancelar", cancelarTurno);
router.put("/:id", editarTurno);
router.delete("/:id", eliminarTurno);

// 🆕 NUEVA ruta para turnos de paquetes
router.get("/paquete", listarTurnosPorPaquete);

module.exports = router;
