// const PagoProfesor = require("../model/pago-profesor-model");
// const Profesor = require("../model/profesor-model");

// const registrarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { horas_trabajadas, valor_hora, periodo, observaciones, estado } =
//       req.body;

//     const profesor = await Profesor.findById(id);
//     if (!profesor) {
//       return res.status(404).json({ msg: "Profesor no encontrado" });
//     }

//     const monto_total = horas_trabajadas * valor_hora;

//     const pago = new PagoProfesor({
//       profesor: id,
//       horas_trabajadas,
//       valor_hora,
//       monto_total,
//       periodo,
//       observaciones,
//       estado: estado || "pagado",
//     });

//     await pago.save();
//     await pago.populate("profesor", "nombre apellido email");

//     res.status(201).json({
//       msg: "Pago registrado exitosamente",
//       pago,
//     });
//   } catch (error) {
//     console.error("Error al registrar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// const obtenerPagosProfesor = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const profesor = await Profesor.findById(id);
//     if (!profesor) {
//       return res.status(404).json({ msg: "Profesor no encontrado" });
//     }

//     const pagos = await PagoProfesor.find({ profesor: id })
//       .populate("profesor", "nombre apellido email")
//       .sort({ fecha_pago: -1 });

//     const totalHoras = pagos.reduce(
//       (sum, pago) => sum + pago.horas_trabajadas,
//       0
//     );
//     const totalPagado = pagos.reduce((sum, pago) => sum + pago.monto_total, 0);

//     res.json({
//       profesor: {
//         id: profesor._id,
//         nombre: profesor.nombre,
//         apellido: profesor.apellido,
//         email: profesor.email,
//       },
//       pagos,
//       resumen: {
//         total_pagos: pagos.length,
//         total_horas: totalHoras,
//         total_pagado: totalPagado,
//       },
//     });
//   } catch (error) {
//     console.error("Error al obtener pagos del profesor:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// const listarTodosPagos = async (req, res) => {
//   try {
//     const pagos = await PagoProfesor.find()
//       .populate("profesor", "nombre apellido email")
//       .sort({ fecha_pago: -1 });

//     const totalHoras = pagos.reduce(
//       (sum, pago) => sum + pago.horas_trabajadas,
//       0
//     );
//     const totalPagado = pagos.reduce((sum, pago) => sum + pago.monto_total, 0);

//     res.json({
//       pagos,
//       resumen: {
//         total_pagos: pagos.length,
//         total_horas: totalHoras,
//         total_pagado: totalPagado,
//       },
//     });
//   } catch (error) {
//     console.error("Error al listar todos los pagos:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// const obtenerDetallePago = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const pago = await PagoProfesor.findById(id).populate(
//       "profesor",
//       "nombre apellido email domicilio telefono"
//     );

//     if (!pago) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     res.json({ pago });
//   } catch (error) {
//     console.error("Error al obtener detalle del pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// const actualizarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { horas_trabajadas, valor_hora, periodo, observaciones, estado } =
//       req.body;

//     const pago = await PagoProfesor.findById(id);
//     if (!pago) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     const monto_total =
//       (horas_trabajadas || pago.horas_trabajadas) *
//       (valor_hora || pago.valor_hora);

//     const pagoActualizado = await PagoProfesor.findByIdAndUpdate(
//       id,
//       {
//         horas_trabajadas: horas_trabajadas || pago.horas_trabajadas,
//         valor_hora: valor_hora || pago.valor_hora,
//         monto_total,
//         periodo: periodo || pago.periodo,
//         observaciones: observaciones || pago.observaciones,
//         estado: estado || pago.estado,
//       },
//       { new: true }
//     ).populate("profesor", "nombre apellido email");

//     res.json({
//       msg: "Pago actualizado exitosamente",
//       pago: pagoActualizado,
//     });
//   } catch (error) {
//     console.error("Error al actualizar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// const eliminarPago = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const pago = await PagoProfesor.findById(id);
//     if (!pago) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     await PagoProfesor.findByIdAndDelete(id);

//     res.json({ msg: "Pago eliminado exitosamente" });
//   } catch (error) {
//     console.error("Error al eliminar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// module.exports = {
//   registrarPago,
//   obtenerPagosProfesor,
//   listarTodosPagos,
//   obtenerDetallePago,
//   actualizarPago,
//   eliminarPago,
// };

const PagoProfesor = require("../model/pago-profesor-model");
const Profesor = require("../model/profesor-model");
const { registrarMovimiento } = require("./cajaController");

const registrarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { horas_trabajadas, valor_hora, periodo, observaciones, estado } =
      req.body;

    const profesor = await Profesor.findById(id);
    if (!profesor) {
      return res.status(404).json({ msg: "Profesor no encontrado" });
    }

    const monto_total = horas_trabajadas * valor_hora;

    const pago = new PagoProfesor({
      profesor: id,
      horas_trabajadas,
      valor_hora,
      monto_total,
      periodo,
      observaciones,
      estado: estado || "pagado",
    });

    await pago.save();
    await pago.populate("profesor", "nombre apellido email");

    // 🔥 REGISTRAR EN CAJA - Pago a profesor
    if (pago.estado === "pagado") {
      await registrarMovimiento({
        tipo: "egreso",
        concepto: `Pago a profesor: ${profesor.nombre} ${profesor.apellido}`,
        monto: Number(monto_total),
        categoria: "pago_profesor",
        referencia_id: pago._id,
        referencia_tipo: "PagoProfesor",
        observaciones: `${horas_trabajadas} horas x $${valor_hora}. Período: ${
          periodo || "No especificado"
        }`,
      });
    }

    res.status(201).json({
      msg: "Pago registrado exitosamente",
      pago,
    });
  } catch (error) {
    console.error("Error al registrar pago:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const obtenerPagosProfesor = async (req, res) => {
  try {
    const { id } = req.params;

    const profesor = await Profesor.findById(id);
    if (!profesor) {
      return res.status(404).json({ msg: "Profesor no encontrado" });
    }

    const pagos = await PagoProfesor.find({ profesor: id })
      .populate("profesor", "nombre apellido email")
      .sort({ fecha_pago: -1 });

    const totalHoras = pagos.reduce(
      (sum, pago) => sum + pago.horas_trabajadas,
      0
    );
    const totalPagado = pagos.reduce((sum, pago) => sum + pago.monto_total, 0);

    res.json({
      profesor: {
        id: profesor._id,
        nombre: profesor.nombre,
        apellido: profesor.apellido,
        email: profesor.email,
      },
      pagos,
      resumen: {
        total_pagos: pagos.length,
        total_horas: totalHoras,
        total_pagado: totalPagado,
      },
    });
  } catch (error) {
    console.error("Error al obtener pagos del profesor:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const listarTodosPagos = async (req, res) => {
  try {
    const pagos = await PagoProfesor.find()
      .populate("profesor", "nombre apellido email")
      .sort({ fecha_pago: -1 });

    const totalHoras = pagos.reduce(
      (sum, pago) => sum + pago.horas_trabajadas,
      0
    );
    const totalPagado = pagos.reduce((sum, pago) => sum + pago.monto_total, 0);

    res.json({
      pagos,
      resumen: {
        total_pagos: pagos.length,
        total_horas: totalHoras,
        total_pagado: totalPagado,
      },
    });
  } catch (error) {
    console.error("Error al listar todos los pagos:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const obtenerDetallePago = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await PagoProfesor.findById(id).populate(
      "profesor",
      "nombre apellido email domicilio telefono"
    );

    if (!pago) {
      return res.status(404).json({ msg: "Pago no encontrado" });
    }

    res.json({ pago });
  } catch (error) {
    console.error("Error al obtener detalle del pago:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { horas_trabajadas, valor_hora, periodo, observaciones, estado } =
      req.body;

    const pago = await PagoProfesor.findById(id);
    if (!pago) {
      return res.status(404).json({ msg: "Pago no encontrado" });
    }

    const estadoAnterior = pago.estado;
    const monto_total =
      (horas_trabajadas || pago.horas_trabajadas) *
      (valor_hora || pago.valor_hora);

    const pagoActualizado = await PagoProfesor.findByIdAndUpdate(
      id,
      {
        horas_trabajadas: horas_trabajadas || pago.horas_trabajadas,
        valor_hora: valor_hora || pago.valor_hora,
        monto_total,
        periodo: periodo || pago.periodo,
        observaciones: observaciones || pago.observaciones,
        estado: estado || pago.estado,
      },
      { new: true }
    ).populate("profesor", "nombre apellido email");

    // 🔥 Si el estado cambió de pendiente a pagado, registrar en caja
    if (estadoAnterior !== "pagado" && pagoActualizado.estado === "pagado") {
      await registrarMovimiento({
        tipo: "egreso",
        concepto: `Pago a profesor: ${pagoActualizado.profesor.nombre} ${pagoActualizado.profesor.apellido}`,
        monto: Number(monto_total),
        categoria: "pago_profesor",
        referencia_id: pagoActualizado._id,
        referencia_tipo: "PagoProfesor",
        observaciones: `${pagoActualizado.horas_trabajadas} horas x $${pagoActualizado.valor_hora}. Actualizado de ${estadoAnterior} a pagado`,
      });
    }

    res.json({
      msg: "Pago actualizado exitosamente",
      pago: pagoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar pago:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await PagoProfesor.findById(id);
    if (!pago) {
      return res.status(404).json({ msg: "Pago no encontrado" });
    }

    await PagoProfesor.findByIdAndDelete(id);

    res.json({ msg: "Pago eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar pago:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  registrarPago,
  obtenerPagosProfesor,
  listarTodosPagos,
  obtenerDetallePago,
  actualizarPago,
  eliminarPago,
};
