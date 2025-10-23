// const Turno = require("../model/turno-model");
// // const Clase = require("../model/clase-model");

// const crearTurno = async (req, res) => {
//   try {
//     const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

//     if (!id_usuario || !id_clase || !fecha || !horaInicio || !horaFin) {
//       return res.status(400).json({ msg: "Todos los campos son obligatorios" });
//     }

//     // Verificar que la clase exista
//     const clase = await Clase.findById(id_clase);
//     if (!clase) {
//       return res.status(404).json({ msg: "Clase no encontrada" });
//     }

//     // Verificar si ya existe un turno en ese horario para el mismo usuario
//     const turnoExistente = await Turno.findOne({
//       id_usuario,
//       id_clase,
//       fecha,
//       horaInicio,
//       estado: "Activo",
//     });

//     if (turnoExistente) {
//       return res
//         .status(400)
//         .json({ msg: "Ya tienes un turno reservado en este horario" });
//     }

//     // Verificar capacidad de la clase
//     const cantidadTurnos = await Turno.countDocuments({
//       id_clase,
//       fecha,
//       horaInicio,
//       estado: "Activo",
//     });

//     if (cantidadTurnos >= clase.capacidad) {
//       return res
//         .status(400)
//         .json({ msg: "La clase ya alcanzó su capacidad máxima" });
//     }

//     const nuevoTurno = new Turno({
//       id_usuario,
//       id_clase,
//       fecha,
//       horaInicio,
//       horaFin,
//     });
//     await nuevoTurno.save();

//     res
//       .status(201)
//       .json({ msg: "Turno reservado con éxito", turno: nuevoTurno });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al reservar el turno" });
//   }
// };

// const listarTurnos = async (req, res) => {
//   try {
//     const turnos = await Turno.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .populate("id_clase", "nombre_clase descripcion");

//     if (!turnos.length) {
//       return res.status(404).json({ msg: "No hay turnos registrados" });
//     }

//     res.status(200).json({ msg: "Lista de turnos", turnos });
//   } catch (error) {
//     res.status(500).json({ msg: "Error al listar turnos" });
//   }
// };

// const cancelarTurno = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const turno = await Turno.findById(id);
//     if (!turno) {
//       return res.status(404).json({ msg: "Turno no encontrado" });
//     }

//     turno.estado = "Cancelado";
//     await turno.save();

//     res.status(200).json({ msg: "Turno cancelado correctamente" });
//   } catch (error) {
//     res.status(500).json({ msg: "Error al cancelar turno" });
//   }
// };

// module.exports = { crearTurno, listarTurnos, cancelarTurno };
// const Turnos = require("../model/turno-model");

// // Crear turno
// const crearTurno = async (req, res) => {
//   try {
//     const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

//     const nuevoTurno = new Turnos({
//       id_usuario,
//       id_clase,
//       fecha,
//       horaInicio,
//       horaFin,
//     });
//     await nuevoTurno.save();

//     res.status(201).json(nuevoTurno);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al crear turno" });
//   }
// };

// // Listar turnos
// const listarTurnos = async (req, res) => {
//   try {
//     const turnos = await Turnos.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .populate("id_clase", "nombre_clase dias horarios");
//     res.json(turnos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al listar turnos" });
//   }
// };

// // Cancelar turno
// const cancelarTurno = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const turnoCancelado = await Turnos.findByIdAndUpdate(
//       id,
//       { estado: "Cancelado" },
//       { new: true }
//     );
//     res.json(turnoCancelado);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al cancelar turno" });
//   }
// };

//

const Turnos = require("../model/turno-model");
const Usuarios = require("../model/usuario-model");

const crearTurno = async (req, res) => {
  try {
    const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

    if (!id_usuario) {
      return res.status(400).json({ msg: "El id del usuario es obligatorio" });
    }

    const nuevoTurno = new Turnos({
      id_usuario,
      id_clase,
      fecha,
      horaInicio,
      horaFin,
    });

    await nuevoTurno.save();
    res
      .status(201)
      .json({ msg: "Turno creado correctamente", turno: nuevoTurno });
  } catch (error) {
    console.error("Error al crear turno:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

const listarTurnos = async (req, res) => {
  try {
    const turnos = await Turnos.find()
      .populate("id_usuario", "nombre_usuario email") // ✅ cambio aquí
      .populate("id_clase", "nombre_clase");
    res.json({ turnos });
  } catch (error) {
    console.error("Error al listar turnos:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

const cancelarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turnos.findById(id).populate(
      "id_usuario",
      "nombre_usuario email"
    ); // ✅ corregido
    if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

    turno.estado = "Cancelado";
    await turno.save();
    res.json({ msg: "Turno cancelado", turno });
  } catch (error) {
    console.error("Error al cancelar turno:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

const listarTurnosPorUsuario = async (req, res) => {
  try {
    const { email } = req.query; // viene desde el frontend

    if (!email) {
      return res.status(400).json({ msg: "El email es obligatorio" });
    }

    // buscamos el usuario por email
    const usuario = await Usuarios.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // buscamos sus turnos
    const turnos = await Turnos.find({ id_usuario: usuario._id })
      .populate("id_usuario", "nombre_usuario email")
      .populate("id_clase", "nombre_clase");

    res.json({ turnos });
  } catch (error) {
    console.error("Error al listar turnos por usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

// 🟢 Editar turno
const editarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, id_clase, fecha, horaInicio, horaFin } = req.body;

    const turno = await Turnos.findById(id);
    if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

    // Actualizamos los campos
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

// 🔴 Eliminar turno
const eliminarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turnos.findByIdAndDelete(id);

    if (!turno) {
      return res.status(404).json({ msg: "Turno no encontrado" });
    }

    res.json({ msg: "Turno eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar turno:", error);
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

module.exports = {
  crearTurno,
  listarTurnos,
  cancelarTurno,
  listarTurnosPorUsuario,
  editarTurno,
  eliminarTurno,
}; // 👈 agregamos esto };
