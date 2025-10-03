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
//     const { nombre_clase, descripcion, dias, horarios, capacidad } = req.body;
//     const nuevaClase = new Clases({
//       nombre_clase,
//       descripcion,
//       dias,
//       horarios,
//       capacidad,
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
//     const { nombre_clase, descripcion, dias, horarios, capacidad, estado } =
//       req.body;

//     const claseActualizada = await Clases.findByIdAndUpdate(
//       id,
//       { nombre_clase, descripcion, dias, horarios, capacidad, estado },
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

const listarClases = async (req, res) => {
  try {
    const clases = await Clases.find();
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al listar clases" });
  }
};

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
      precio, // 👈 agregado
    });

    await nuevaClase.save();
    res.status(201).json(nuevaClase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear clase" });
  }
};

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
    } = req.body;

    const claseActualizada = await Clases.findByIdAndUpdate(
      id,
      { nombre_clase, descripcion, dias, horarios, capacidad, estado, precio }, // 👈 agregado
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

module.exports = { listarClases, crearClase, actualizarClase, eliminarClase };
