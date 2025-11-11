// const mongoose = require("mongoose");
// const Turnos = require("../model/turno-model");
// const Usuarios = require("../model/usuario-model");
// const Clases = require("../model/clase-model");

// const crearTurno = async (req, res) => {
//   try {
//     const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

//     if (!id_usuario) {
//       return res.status(400).json({ msg: "El id del usuario es obligatorio" });
//     }

//     const nuevoTurno = new Turnos({
//       id_usuario,
//       id_clase,
//       fecha,
//       horaInicio,
//       horaFin,
//     });

//     await nuevoTurno.save();
//     res
//       .status(201)
//       .json({ msg: "Turno creado correctamente", turno: nuevoTurno });
//   } catch (error) {
//     console.error("Error al crear turno:", error);
//     res.status(500).json({ msg: "Error interno del servidor", error });
//   }
// };

// const listarTurnos = async (req, res) => {
//   try {
//     const turnos = await Turnos.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .populate("id_clase", "nombre_clase");
//     res.json({ turnos });
//   } catch (error) {
//     console.error("Error al listar turnos:", error);
//     res.status(500).json({ msg: "Error interno del servidor", error });
//   }
// };

// const cancelarTurno = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const turno = await Turnos.findById(id).populate(
//       "id_usuario",
//       "nombre_usuario email"
//     );
//     if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

//     turno.estado = "Cancelado";
//     await turno.save();
//     res.json({ msg: "Turno cancelado", turno });
//   } catch (error) {
//     console.error("Error al cancelar turno:", error);
//     res.status(500).json({ msg: "Error interno del servidor", error });
//   }
// };

// const listarTurnosPorUsuario = async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

//     const usuario = await Usuarios.findOne({ email });
//     if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

//     const turnos = await Turnos.find({ id_usuario: usuario._id })
//       .populate("id_usuario", "nombre_usuario email")
//       .populate("id_clase", "nombre_clase");

//     res.json({ turnos });
//   } catch (error) {
//     console.error("Error al listar turnos por usuario:", error);
//     res.status(500).json({ msg: "Error interno del servidor", error });
//   }
// };

// const editarTurno = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

//     const turno = await Turnos.findById(id);
//     if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

//     turno.id_usuario = id_usuario || turno.id_usuario;
//     turno.id_clase = id_clase || turno.id_clase;
//     turno.fecha = fecha || turno.fecha;
//     turno.horaInicio = horaInicio || turno.horaInicio;
//     turno.horaFin = horaFin || turno.horaFin;

//     await turno.save();
//     res.json({ msg: "Turno actualizado correctamente", turno });
//   } catch (error) {
//     console.error("Error al editar turno:", error);
//     res.status(500).json({ msg: "Error interno del servidor", error });
//   }
// };

// const eliminarTurno = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const turno = await Turnos.findByIdAndDelete(id);
//     if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

//     res.json({ msg: "Turno eliminado correctamente" });
//   } catch (error) {
//     console.error("Error al eliminar turno:", error);
//     res.status(500).json({ msg: "Error interno del servidor", error });
//   }
// };

// // ✅ Función corregida: usa toISOString().split('T')[0] para evitar problemas de zona horaria
// const listarTurnosConCantidadPorClase = async (req, res) => {
//   try {
//     const { desde, hasta } = req.query;
//     const filtro = {};

//     if (desde || hasta) {
//       filtro.fecha = {};
//       if (desde) filtro.fecha.$gte = new Date(desde);
//       if (hasta) filtro.fecha.$lte = new Date(hasta);
//     }

//     const turnos = await Turnos.find(filtro)
//       .populate("id_clase", "nombre_clase")
//       .populate("id_usuario", "nombre_usuario")
//       .select("fecha horaInicio horaFin id_clase id_usuario")
//       .sort({ fecha: 1 });

//     const detalle = turnos.map((t) => ({
//       nombre_clase: t.id_clase?.nombre_clase || "Sin clase",
//       alumno: t.id_usuario?.nombre_usuario || "Sin alumno",
//       fecha: t.fecha
//         ? new Date(t.fecha).toISOString().split("T")[0]
//         : "Sin fecha",
//       horaInicio: t.horaInicio,
//       horaFin: t.horaFin,
//     }));

//     const cantidadPorClase = {};
//     turnos.forEach((t) => {
//       const nombre = t.id_clase?.nombre_clase || "Sin clase";
//       cantidadPorClase[nombre] = (cantidadPorClase[nombre] || 0) + 1;
//     });

//     res.json({ detalle, cantidadPorClase });
//   } catch (error) {
//     console.error("Error al listar turnos con cantidad por clase:", error);
//     res.status(500).json({ msg: "Error al listar turnos", error });
//   }
// };

// module.exports = {
//   crearTurno,
//   listarTurnos,
//   cancelarTurno,
//   listarTurnosPorUsuario,
//   editarTurno,
//   eliminarTurno,
//   listarTurnosConCantidadPorClase,
// };
const mongoose = require("mongoose");
const Turnos = require("../model/turno-model");
const Usuarios = require("../model/usuario-model");
const Clases = require("../model/clase-model");

// ✅ Función original con soporte para paquetes
const crearTurno = async (req, res) => {
  try {
    const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

    if (!id_usuario) {
      return res.status(400).json({ msg: "El id del usuario es obligatorio" });
    }

    // Verificar si la clase es un paquete
    const clase = await Clases.findById(id_clase);
    if (!clase) {
      return res.status(404).json({ msg: "Clase no encontrada" });
    }

    // Si es un paquete, verificar que el usuario tenga sesiones disponibles
    if (clase.tipo_clase === "paquete_8" || clase.tipo_clase === "paquete_12") {
      // Aquí podrías agregar lógica adicional para verificar sesiones disponibles
      // Por ahora solo creamos el turno
    }

    const nuevoTurno = new Turnos({
      id_usuario,
      id_clase,
      fecha,
      horaInicio,
      horaFin,
    });

    await nuevoTurno.save();

    // Populate para devolver información completa
    await nuevoTurno.populate([
      { path: "id_usuario", select: "nombre_usuario email" },
      { path: "id_clase", select: "nombre_clase tipo_clase cantidad_sesiones" },
    ]);

    res.status(201).json({
      msg: "Turno creado correctamente",
      turno: nuevoTurno,
    });
  } catch (error) {
    console.error("Error al crear turno:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// ✅ Mantiene funcionalidad original
const listarTurnos = async (req, res) => {
  try {
    const turnos = await Turnos.find()
      .populate("id_usuario", "nombre_usuario email")
      .populate("id_clase", "nombre_clase tipo_clase cantidad_sesiones");
    res.json({ turnos });
  } catch (error) {
    console.error("Error al listar turnos:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// ✅ Mantiene funcionalidad original
const cancelarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turnos.findById(id).populate(
      "id_usuario",
      "nombre_usuario email"
    );
    if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

    turno.estado = "Cancelado";
    await turno.save();
    res.json({ msg: "Turno cancelado", turno });
  } catch (error) {
    console.error("Error al cancelar turno:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// ✅ Mantiene funcionalidad original
const listarTurnosPorUsuario = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

    const usuario = await Usuarios.findOne({ email });
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    const turnos = await Turnos.find({ id_usuario: usuario._id })
      .populate("id_usuario", "nombre_usuario email")
      .populate("id_clase", "nombre_clase tipo_clase cantidad_sesiones");

    res.json({ turnos });
  } catch (error) {
    console.error("Error al listar turnos por usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// 🆕 NUEVO: Listar turnos de un usuario para un paquete específico
const listarTurnosPorPaquete = async (req, res) => {
  try {
    const { email, id_clase } = req.query;

    if (!email || !id_clase) {
      return res.status(400).json({
        msg: "El email y el id de la clase son obligatorios",
      });
    }

    const usuario = await Usuarios.findOne({ email });
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    const clase = await Clases.findById(id_clase);
    if (!clase) return res.status(404).json({ msg: "Clase no encontrada" });

    const turnos = await Turnos.find({
      id_usuario: usuario._id,
      id_clase: id_clase,
      estado: "Activo",
    })
      .populate("id_usuario", "nombre_usuario email")
      .populate("id_clase", "nombre_clase tipo_clase cantidad_sesiones")
      .sort({ fecha: 1 });

    const sesiones_usadas = turnos.length;
    const sesiones_restantes = clase.cantidad_sesiones
      ? clase.cantidad_sesiones - sesiones_usadas
      : null;

    res.json({
      turnos,
      resumen: {
        clase: clase.nombre_clase,
        tipo: clase.tipo_clase,
        sesiones_totales: clase.cantidad_sesiones,
        sesiones_usadas,
        sesiones_restantes,
      },
    });
  } catch (error) {
    console.error("Error al listar turnos por paquete:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// ✅ Mantiene funcionalidad original
const editarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

    const turno = await Turnos.findById(id);
    if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

    turno.id_usuario = id_usuario || turno.id_usuario;
    turno.id_clase = id_clase || turno.id_clase;
    turno.fecha = fecha || turno.fecha;
    turno.horaInicio = horaInicio || turno.horaInicio;
    turno.horaFin = horaFin || turno.horaFin;

    await turno.save();
    res.json({ msg: "Turno actualizado correctamente", turno });
  } catch (error) {
    console.error("Error al editar turno:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// ✅ Mantiene funcionalidad original
const eliminarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turnos.findByIdAndDelete(id);
    if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

    res.json({ msg: "Turno eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar turno:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// ✅ Mantiene funcionalidad original
const listarTurnosConCantidadPorClase = async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    const filtro = {};

    if (desde || hasta) {
      filtro.fecha = {};
      if (desde) filtro.fecha.$gte = new Date(desde);
      if (hasta) filtro.fecha.$lte = new Date(hasta);
    }

    const turnos = await Turnos.find(filtro)
      .populate("id_clase", "nombre_clase tipo_clase cantidad_sesiones")
      .populate("id_usuario", "nombre_usuario")
      .select("fecha horaInicio horaFin id_clase id_usuario")
      .sort({ fecha: 1 });

    const detalle = turnos.map((t) => ({
      nombre_clase: t.id_clase?.nombre_clase || "Sin clase",
      tipo_clase: t.id_clase?.tipo_clase || "regular",
      alumno: t.id_usuario?.nombre_usuario || "Sin alumno",
      fecha: t.fecha
        ? new Date(t.fecha).toISOString().split("T")[0]
        : "Sin fecha",
      horaInicio: t.horaInicio,
      horaFin: t.horaFin,
    }));

    const cantidadPorClase = {};
    turnos.forEach((t) => {
      const nombre = t.id_clase?.nombre_clase || "Sin clase";
      cantidadPorClase[nombre] = (cantidadPorClase[nombre] || 0) + 1;
    });

    res.json({ detalle, cantidadPorClase });
  } catch (error) {
    console.error("Error al listar turnos con cantidad por clase:", error);
    res.status(500).json({ msg: "Error al listar turnos", error });
  }
};

module.exports = {
  crearTurno,
  listarTurnos,
  cancelarTurno,
  listarTurnosPorUsuario,
  editarTurno,
  eliminarTurno,
  listarTurnosConCantidadPorClase,
  listarTurnosPorPaquete, // 🆕 Nueva función
};
