// const { Router } = require("express");
// const {
//   crearTurno,
//   listarTurnos,
//   listarTurnosPorUsuario,
//   cancelarTurno,
// } = require("../controllers/turnoController");

// const router = Router();

// // Reservar turno
// router.post("/", crearTurno);

// // Listar turnos
// router.get("/", listarTurnos);

// // Listar turnos de un usuario
// router.get("/usuario/:id_usuario", listarTurnosPorUsuario);

// // Cancelar turno
// router.put("/:id/cancelar", cancelarTurno);

// module.exports = router;

const { Router } = require("express");
const {
  crearTurno,
  listarTurnos,
  listarTurnosPorUsuario,
  cancelarTurno,
} = require("../controllers/turnoController");

const router = Router();

// Reservar turno
router.post("/", crearTurno);

// Listar todos los turnos
router.get("/", listarTurnos);

// Listar turnos de un usuario logueado
router.get("/usuario", listarTurnosPorUsuario);
// Cancelar turno
router.put("/:id/cancelar", cancelarTurno);

module.exports = router;
