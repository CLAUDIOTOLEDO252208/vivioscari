// const Clases = require("../model/clase-model");

// const listarClases = async (req, res) => {
//   try {
//     const clases = await Clases.find();
//     res.json(clases);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al listar clases" });
//   }
// };

// const crearClase = async (req, res) => {
//   try {
//     const { nombre_clase, descripcion, dias, horarios, capacidad, precio } =
//       req.body;

//     const nuevaClase = new Clases({
//       nombre_clase,
//       descripcion,
//       dias,
//       horarios,
//       capacidad,
//       precio, // 👈 agregado
//     });

//     await nuevaClase.save();
//     res.status(201).json(nuevaClase);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al crear clase" });
//   }
// };

// const actualizarClase = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       nombre_clase,
//       descripcion,
//       dias,
//       horarios,
//       capacidad,
//       estado,
//       precio,
//     } = req.body;

//     const claseActualizada = await Clases.findByIdAndUpdate(
//       id,
//       { nombre_clase, descripcion, dias, horarios, capacidad, estado, precio }, // 👈 agregado
//       { new: true }
//     );

//     if (!claseActualizada)
//       return res.status(404).json({ msg: "Clase no encontrada" });

//     res.json(claseActualizada);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al actualizar clase" });
//   }
// };

// const eliminarClase = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const claseEliminada = await Clases.findByIdAndDelete(id);
//     if (!claseEliminada)
//       return res.status(404).json({ msg: "Clase no encontrada" });
//     res.json({ msg: "Clase eliminada correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al eliminar clase" });
//   }
// };

// module.exports = { listarClases, crearClase, actualizarClase, eliminarClase };
const Clases = require("../model/clase-model");

// ✅ Mantiene la funcionalidad original
const listarClases = async (req, res) => {
  try {
    const clases = await Clases.find();
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al listar clases" });
  }
};

// ✅ Mantiene la funcionalidad original
const crearClase = async (req, res) => {
  try {
    const { nombre_clase, descripcion, dias, horarios, capacidad, precio } =
      req.body;
    const nuevaClase = new Clases({
      nombre_clase,
      descripcion,
      dias,
      horarios,
      capacidad,
      precio,
    });
    await nuevaClase.save();
    res.status(201).json(nuevaClase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear clase" });
  }
};

// 🆕 NUEVO: Crear clase con paquete de 8 sesiones
const crearClasePaquete8 = async (req, res) => {
  try {
    const { nombre_clase, descripcion, dias, horarios, capacidad, precio } =
      req.body;

    if (!dias || dias.length === 0) {
      return res.status(400).json({
        msg: "Debes especificar al menos un día para el paquete",
      });
    }

    if (!horarios || horarios.length === 0) {
      return res.status(400).json({
        msg: "Debes especificar al menos un horario para el paquete",
      });
    }

    const nuevaClase = new Clases({
      nombre_clase,
      descripcion,
      dias,
      horarios,
      capacidad: capacidad || 10,
      precio: precio || 0,
      tipo_clase: "paquete_8",
      cantidad_sesiones: 8,
    });

    await nuevaClase.save();
    res.status(201).json({
      msg: "Clase con paquete de 8 sesiones creada correctamente",
      clase: nuevaClase,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al crear clase con paquete de 8 sesiones" });
  }
};

// 🆕 NUEVO: Crear clase con paquete de 12 sesiones
const crearClasePaquete12 = async (req, res) => {
  try {
    const { nombre_clase, descripcion, dias, horarios, capacidad, precio } =
      req.body;

    if (!dias || dias.length === 0) {
      return res.status(400).json({
        msg: "Debes especificar al menos un día para el paquete",
      });
    }

    if (!horarios || horarios.length === 0) {
      return res.status(400).json({
        msg: "Debes especificar al menos un horario para el paquete",
      });
    }

    const nuevaClase = new Clases({
      nombre_clase,
      descripcion,
      dias,
      horarios,
      capacidad: capacidad || 10,
      precio: precio || 0,
      tipo_clase: "paquete_12",
      cantidad_sesiones: 12,
    });

    await nuevaClase.save();
    res.status(201).json({
      msg: "Clase con paquete de 12 sesiones creada correctamente",
      clase: nuevaClase,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al crear clase con paquete de 12 sesiones" });
  }
};

// 🆕 NUEVO: Listar solo clases regulares
const listarClasesRegulares = async (req, res) => {
  try {
    const clases = await Clases.find({ tipo_clase: "regular" });
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al listar clases regulares" });
  }
};

// 🆕 NUEVO: Listar solo paquetes
const listarPaquetes = async (req, res) => {
  try {
    const paquetes = await Clases.find({
      tipo_clase: { $in: ["paquete_8", "paquete_12"] },
    });
    res.json(paquetes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al listar paquetes" });
  }
};

// ✅ Mantiene la funcionalidad original (actualizada para soportar nuevos campos)
const actualizarClase = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_clase,
      descripcion,
      dias,
      horarios,
      capacidad,
      estado,
      precio,
      tipo_clase,
      cantidad_sesiones,
    } = req.body;

    const claseActualizada = await Clases.findByIdAndUpdate(
      id,
      {
        nombre_clase,
        descripcion,
        dias,
        horarios,
        capacidad,
        estado,
        precio,
        tipo_clase,
        cantidad_sesiones,
      },
      { new: true }
    );

    if (!claseActualizada)
      return res.status(404).json({ msg: "Clase no encontrada" });

    res.json(claseActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar clase" });
  }
};

// ✅ Mantiene la funcionalidad original
const eliminarClase = async (req, res) => {
  try {
    const { id } = req.params;
    const claseEliminada = await Clases.findByIdAndDelete(id);
    if (!claseEliminada)
      return res.status(404).json({ msg: "Clase no encontrada" });
    res.json({ msg: "Clase eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar clase" });
  }
};

module.exports = {
  listarClases,
  crearClase,
  actualizarClase,
  eliminarClase,
  // 🆕 Nuevas funciones
  crearClasePaquete8,
  crearClasePaquete12,
  listarClasesRegulares,
  listarPaquetes,
};
