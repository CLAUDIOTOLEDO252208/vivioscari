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
  editarTurno,
  eliminarTurno,
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
router.put("/:id", editarTurno); // ✅ nueva ruta para editar
router.delete("/:id", eliminarTurno); // ✅ nueva ruta para eliminar

module.exports = router;
