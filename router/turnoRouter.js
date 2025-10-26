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

// const { Router } = require("express");
// const {
//   crearTurno,
//   listarTurnos,
//   listarTurnosPorUsuario,
//   cancelarTurno,
//   editarTurno,
//   eliminarTurno,
// } = require("../controllers/turnoController");

// const router = Router();

// // Reservar turno
// router.post("/", crearTurno);

// // Listar todos los turnos
// router.get("/", listarTurnos);

// // Listar turnos de un usuario logueado
// router.get("/usuario", listarTurnosPorUsuario);
// // Cancelar turno
// router.put("/:id/cancelar", cancelarTurno);
// router.put("/:id", editarTurno); // ✅ nueva ruta para editar
// router.delete("/:id", eliminarTurno); // ✅ nueva ruta para eliminar

// module.exports = router;
// const { Router } = require("express");
// const {
//   crearTurno,
//   listarTurnos,
//   listarTurnosPorUsuario,
//   cancelarTurno,
//   editarTurno,
//   eliminarTurno,
//   listarCantidadTurnosPorClase,
// } = require("../controllers/turnoController");

// const router = Router();

// // Crear turno
// router.post("/", crearTurno);

// // Listar todos los turnos
// router.get("/", listarTurnos);

// // Listar turnos por usuario
// router.get("/usuario", listarTurnosPorUsuario);

// // Contar cantidad de turnos por clase (con filtro opcional)
// router.get("/cantidad-por-clase", listarCantidadTurnosPorClase);

// // Cancelar turno
// router.put("/:id/cancelar", cancelarTurno);

// // Editar turno
// router.put("/:id", editarTurno);

// // Eliminar turno
// router.delete("/:id", eliminarTurno);

// module.exports = router;
// const { Router } = require("express");
// const {
//   crearTurno,
//   listarTurnos,
//   listarTurnosPorUsuario,
//   cancelarTurno,
//   editarTurno,
//   eliminarTurno,
//   listarCantidadTurnosPorClase,
//   listarTurnosDetalladosPorClase,
// } = require("../controllers/turnoController");

// const router = Router();

// // Crear turno
// router.post("/", crearTurno);

// // Listar todos los turnos
// router.get("/", listarTurnos);

// // Listar turnos por usuario
// router.get("/usuario", listarTurnosPorUsuario);

// // Contar cantidad de turnos por clase
// router.get("/cantidad-por-clase", listarCantidadTurnosPorClase);

// // Listar turnos detallados por clase (fecha y hora)
// router.get("/detallado-por-clase", listarTurnosDetalladosPorClase);

// // Cancelar turno
// router.put("/:id/cancelar", cancelarTurno);

// // Editar turno
// router.put("/:id", editarTurno);

// // Eliminar turno
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
} = require("../controllers/turnoController");

const router = Router();

router.post("/", crearTurno);
router.get("/", listarTurnos);
router.get("/usuario", listarTurnosPorUsuario);
router.get("/detallado-con-cantidad", listarTurnosConCantidadPorClase); // 🔹 NUEVO ENDPOINT
router.put("/:id/cancelar", cancelarTurno);
router.put("/:id", editarTurno);
router.delete("/:id", eliminarTurno);

module.exports = router;
