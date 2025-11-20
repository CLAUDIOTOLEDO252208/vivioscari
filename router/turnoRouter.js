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
  crearPaqueteFijo, // 🆕 Agregar
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
router.post("/paquete-fijo", crearPaqueteFijo); // 🆕 Nueva ruta

module.exports = router;
