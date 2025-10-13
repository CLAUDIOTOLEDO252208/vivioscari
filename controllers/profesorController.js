const Profesor = require("../model/profesor-model");

const crearProfesor = async (req, res) => {
  try {
    const { nombre, apellido, email, domicilio, telefono } = req.body;

    const existeEmail = await Profesor.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ msg: "El email ya está registrado" });
    }

    const profesor = new Profesor({
      nombre,
      apellido,
      email,
      domicilio,
      telefono,
    });

    await profesor.save();

    res.status(201).json({
      msg: "Profesor creado exitosamente",
      profesor,
    });
  } catch (error) {
    console.error("Error al crear profesor:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const listarProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.find({ estado: true });
    res.json({ profesores });
  } catch (error) {
    console.error("Error al listar profesores:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const obtenerProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const profesor = await Profesor.findById(id);

    if (!profesor) {
      return res.status(404).json({ msg: "Profesor no encontrado" });
    }

    res.json({ profesor });
  } catch (error) {
    console.error("Error al obtener profesor:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const actualizarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, domicilio, telefono } = req.body;

    const profesor = await Profesor.findById(id);
    if (!profesor) {
      return res.status(404).json({ msg: "Profesor no encontrado" });
    }

    if (email && email !== profesor.email) {
      const existeEmail = await Profesor.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({ msg: "El email ya está registrado" });
      }
    }

    const profesorActualizado = await Profesor.findByIdAndUpdate(
      id,
      { nombre, apellido, email, domicilio, telefono },
      { new: true }
    );

    res.json({
      msg: "Profesor actualizado exitosamente",
      profesor: profesorActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar profesor:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const eliminarProfesor = async (req, res) => {
  try {
    const { id } = req.params;

    const profesor = await Profesor.findById(id);
    if (!profesor) {
      return res.status(404).json({ msg: "Profesor no encontrado" });
    }

    await Profesor.findByIdAndUpdate(id, { estado: false });

    res.json({ msg: "Profesor eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar profesor:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  crearProfesor,
  listarProfesores,
  obtenerProfesor,
  actualizarProfesor,
  eliminarProfesor,
};
