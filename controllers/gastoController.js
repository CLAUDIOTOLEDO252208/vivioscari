const Gasto = require("../model/gasto-model");
const { registrarMovimiento } = require("./cajaController");

// ✅ Crear gasto
const crearGasto = async (req, res) => {
  try {
    const { concepto, monto, categoria, descripcion, comprobante, estado } =
      req.body;

    if (!concepto || !monto) {
      return res.status(400).json({ msg: "Concepto y monto son obligatorios" });
    }

    const gasto = new Gasto({
      concepto,
      monto: Number(monto),
      categoria,
      descripcion,
      comprobante,
      estado: estado || "pagado",
    });

    await gasto.save();

    // Registrar en caja si está pagado
    if (gasto.estado === "pagado") {
      await registrarMovimiento({
        tipo: "egreso",
        concepto: `Gasto: ${concepto}`,
        monto: Number(monto),
        categoria: "gasto_operativo",
        referencia_id: gasto._id,
        referencia_tipo: "Gasto",
        observaciones: descripcion,
      });
    }

    res.status(201).json({
      msg: "Gasto registrado exitosamente",
      gasto,
    });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Listar gastos
const listarGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find().sort({ fecha_gasto: -1 });

    const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0);

    res.json({
      gastos,
      resumen: {
        total_gastos: gastos.length,
        monto_total: totalGastos,
      },
    });
  } catch (error) {
    console.error("Error al listar gastos:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Obtener un gasto
const obtenerGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const gasto = await Gasto.findById(id);

    if (!gasto) {
      return res.status(404).json({ msg: "Gasto no encontrado" });
    }

    res.json({ gasto });
  } catch (error) {
    console.error("Error al obtener gasto:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Actualizar gasto
const actualizarGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const { concepto, monto, categoria, descripcion, comprobante, estado } =
      req.body;

    const gasto = await Gasto.findById(id);
    if (!gasto) {
      return res.status(404).json({ msg: "Gasto no encontrado" });
    }

    const gastoActualizado = await Gasto.findByIdAndUpdate(
      id,
      { concepto, monto, categoria, descripcion, comprobante, estado },
      { new: true }
    );

    res.json({
      msg: "Gasto actualizado exitosamente",
      gasto: gastoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Eliminar gasto
const eliminarGasto = async (req, res) => {
  try {
    const { id } = req.params;

    const gasto = await Gasto.findById(id);
    if (!gasto) {
      return res.status(404).json({ msg: "Gasto no encontrado" });
    }

    await Gasto.findByIdAndDelete(id);

    res.json({ msg: "Gasto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  crearGasto,
  listarGastos,
  obtenerGasto,
  actualizarGasto,
  eliminarGasto,
};
