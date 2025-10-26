// const Caja = require("../model/caja-model");

// // ✅ Registrar movimiento en caja (función auxiliar)
// const registrarMovimiento = async (datos) => {
//   try {
//     const movimiento = new Caja(datos);
//     await movimiento.save();
//     return movimiento;
//   } catch (error) {
//     console.error("Error al registrar movimiento en caja:", error);
//     throw error;
//   }
// };

// // ✅ Obtener todos los movimientos de caja
// const obtenerMovimientos = async (req, res) => {
//   try {
//     const { tipo, fecha_desde, fecha_hasta } = req.query;

//     let filtros = {};

//     if (tipo) {
//       filtros.tipo = tipo;
//     }

//     if (fecha_desde || fecha_hasta) {
//       filtros.fecha = {};
//       if (fecha_desde) {
//         filtros.fecha.$gte = new Date(fecha_desde);
//       }
//       if (fecha_hasta) {
//         filtros.fecha.$lte = new Date(fecha_hasta);
//       }
//     }

//     const movimientos = await Caja.find(filtros).sort({ fecha: -1 });

//     // Calcular balance
//     const ingresos = movimientos
//       .filter((m) => m.tipo === "ingreso")
//       .reduce((sum, m) => sum + m.monto, 0);

//     const egresos = movimientos
//       .filter((m) => m.tipo === "egreso")
//       .reduce((sum, m) => sum + m.monto, 0);

//     const balance = ingresos - egresos;

//     res.json({
//       movimientos,
//       resumen: {
//         total_movimientos: movimientos.length,
//         total_ingresos: ingresos,
//         total_egresos: egresos,
//         balance: balance,
//       },
//     });
//   } catch (error) {
//     console.error("Error al obtener movimientos:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Obtener balance actual de caja
// const obtenerBalance = async (req, res) => {
//   try {
//     const ingresos = await Caja.aggregate([
//       { $match: { tipo: "ingreso" } },
//       { $group: { _id: null, total: { $sum: "$monto" } } },
//     ]);

//     const egresos = await Caja.aggregate([
//       { $match: { tipo: "egreso" } },
//       { $group: { _id: null, total: { $sum: "$monto" } } },
//     ]);

//     const totalIngresos = ingresos[0]?.total || 0;
//     const totalEgresos = egresos[0]?.total || 0;
//     const balance = totalIngresos - totalEgresos;

//     res.json({
//       total_ingresos: totalIngresos,
//       total_egresos: totalEgresos,
//       balance: balance,
//     });
//   } catch (error) {
//     console.error("Error al obtener balance:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Registrar ingreso manual
// const registrarIngreso = async (req, res) => {
//   try {
//     const { concepto, monto, observaciones } = req.body;

//     if (!concepto || !monto) {
//       return res.status(400).json({ msg: "Concepto y monto son obligatorios" });
//     }

//     const movimiento = await registrarMovimiento({
//       tipo: "ingreso",
//       concepto,
//       monto: Number(monto),
//       categoria: "otro",
//       observaciones,
//     });

//     res.status(201).json({
//       msg: "Ingreso registrado exitosamente",
//       movimiento,
//     });
//   } catch (error) {
//     console.error("Error al registrar ingreso:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Registrar egreso manual
// const registrarEgreso = async (req, res) => {
//   try {
//     const { concepto, monto, observaciones } = req.body;

//     if (!concepto || !monto) {
//       return res.status(400).json({ msg: "Concepto y monto son obligatorios" });
//     }

//     const movimiento = await registrarMovimiento({
//       tipo: "egreso",
//       concepto,
//       monto: Number(monto),
//       categoria: "otro",
//       observaciones,
//     });

//     res.status(201).json({
//       msg: "Egreso registrado exitosamente",
//       movimiento,
//     });
//   } catch (error) {
//     console.error("Error al registrar egreso:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Eliminar movimiento de caja
// const eliminarMovimiento = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const movimiento = await Caja.findById(id);
//     if (!movimiento) {
//       return res.status(404).json({ msg: "Movimiento no encontrado" });
//     }

//     await Caja.findByIdAndDelete(id);

//     res.json({ msg: "Movimiento eliminado exitosamente" });
//   } catch (error) {
//     console.error("Error al eliminar movimiento:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Obtener resumen por período
// const obtenerResumenPeriodo = async (req, res) => {
//   try {
//     const { mes, anio } = req.query;

//     let fecha_desde, fecha_hasta;

//     if (mes && anio) {
//       fecha_desde = new Date(anio, mes - 1, 1);
//       fecha_hasta = new Date(anio, mes, 0, 23, 59, 59);
//     } else {
//       // Si no se especifica, usar el mes actual
//       const hoy = new Date();
//       fecha_desde = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
//       fecha_hasta = new Date(
//         hoy.getFullYear(),
//         hoy.getMonth() + 1,
//         0,
//         23,
//         59,
//         59
//       );
//     }

//     const movimientos = await Caja.find({
//       fecha: { $gte: fecha_desde, $lte: fecha_hasta },
//     });

//     // Agrupar por categoría
//     const porCategoria = {};
//     movimientos.forEach((m) => {
//       if (!porCategoria[m.categoria]) {
//         porCategoria[m.categoria] = { ingresos: 0, egresos: 0 };
//       }
//       if (m.tipo === "ingreso") {
//         porCategoria[m.categoria].ingresos += m.monto;
//       } else {
//         porCategoria[m.categoria].egresos += m.monto;
//       }
//     });

//     const ingresos = movimientos
//       .filter((m) => m.tipo === "ingreso")
//       .reduce((sum, m) => sum + m.monto, 0);

//     const egresos = movimientos
//       .filter((m) => m.tipo === "egreso")
//       .reduce((sum, m) => sum + m.monto, 0);

//     res.json({
//       periodo: {
//         desde: fecha_desde,
//         hasta: fecha_hasta,
//       },
//       resumen: {
//         total_ingresos: ingresos,
//         total_egresos: egresos,
//         balance: ingresos - egresos,
//       },
//       por_categoria: porCategoria,
//     });
//   } catch (error) {
//     console.error("Error al obtener resumen:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// module.exports = {
//   registrarMovimiento,
//   obtenerMovimientos,
//   obtenerBalance,
//   registrarIngreso,
//   registrarEgreso,
//   eliminarMovimiento,
//   obtenerResumenPeriodo,
// };
const Caja = require("../model/caja-model");

// ✅ Registrar movimiento en caja (función auxiliar)
const registrarMovimiento = async (datos) => {
  try {
    const movimiento = new Caja(datos);
    await movimiento.save();
    return movimiento;
  } catch (error) {
    console.error("Error al registrar movimiento en caja:", error);
    throw error;
  }
};

// ✅ Obtener todos los movimientos de caja - CORREGIDO
const obtenerMovimientos = async (req, res) => {
  try {
    const { tipo, fecha_desde, fecha_hasta } = req.query;

    let filtros = {};

    if (tipo) {
      filtros.tipo = tipo;
    }

    // ✅ CORRECCIÓN: Agregar la hora en UTC
    if (fecha_desde || fecha_hasta) {
      filtros.fecha = {};
      if (fecha_desde) {
        filtros.fecha.$gte = new Date(fecha_desde + "T00:00:00.000Z");
      }
      if (fecha_hasta) {
        filtros.fecha.$lte = new Date(fecha_hasta + "T23:59:59.999Z");
      }
    }

    const movimientos = await Caja.find(filtros).sort({ fecha: -1 });

    // Calcular balance
    const ingresos = movimientos
      .filter((m) => m.tipo === "ingreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const egresos = movimientos
      .filter((m) => m.tipo === "egreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const balance = ingresos - egresos;

    res.json({
      movimientos,
      resumen: {
        total_movimientos: movimientos.length,
        total_ingresos: ingresos,
        total_egresos: egresos,
        balance: balance,
      },
    });
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Obtener balance actual de caja
const obtenerBalance = async (req, res) => {
  try {
    const ingresos = await Caja.aggregate([
      { $match: { tipo: "ingreso" } },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);

    const egresos = await Caja.aggregate([
      { $match: { tipo: "egreso" } },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);

    const totalIngresos = ingresos[0]?.total || 0;
    const totalEgresos = egresos[0]?.total || 0;
    const balance = totalIngresos - totalEgresos;

    res.json({
      total_ingresos: totalIngresos,
      total_egresos: totalEgresos,
      balance: balance,
    });
  } catch (error) {
    console.error("Error al obtener balance:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Registrar ingreso manual
const registrarIngreso = async (req, res) => {
  try {
    const { concepto, monto, observaciones } = req.body;

    if (!concepto || !monto) {
      return res.status(400).json({ msg: "Concepto y monto son obligatorios" });
    }

    const movimiento = await registrarMovimiento({
      tipo: "ingreso",
      concepto,
      monto: Number(monto),
      categoria: "otro",
      observaciones,
    });

    res.status(201).json({
      msg: "Ingreso registrado exitosamente",
      movimiento,
    });
  } catch (error) {
    console.error("Error al registrar ingreso:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Registrar egreso manual
const registrarEgreso = async (req, res) => {
  try {
    const { concepto, monto, observaciones } = req.body;

    if (!concepto || !monto) {
      return res.status(400).json({ msg: "Concepto y monto son obligatorios" });
    }

    const movimiento = await registrarMovimiento({
      tipo: "egreso",
      concepto,
      monto: Number(monto),
      categoria: "otro",
      observaciones,
    });

    res.status(201).json({
      msg: "Egreso registrado exitosamente",
      movimiento,
    });
  } catch (error) {
    console.error("Error al registrar egreso:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Eliminar movimiento de caja
const eliminarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const movimiento = await Caja.findById(id);
    if (!movimiento) {
      return res.status(404).json({ msg: "Movimiento no encontrado" });
    }

    await Caja.findByIdAndDelete(id);

    res.json({ msg: "Movimiento eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar movimiento:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Obtener resumen por período - CORREGIDO
const obtenerResumenPeriodo = async (req, res) => {
  try {
    const { mes, anio } = req.query;

    let fecha_desde, fecha_hasta;

    if (mes && anio) {
      // ✅ CORRECCIÓN: Usar Date.UTC para evitar problemas de zona horaria
      const mesNum = parseInt(mes);
      const anioNum = parseInt(anio);

      fecha_desde = new Date(Date.UTC(anioNum, mesNum - 1, 1, 0, 0, 0, 0));
      fecha_hasta = new Date(Date.UTC(anioNum, mesNum, 0, 23, 59, 59, 999));
    } else {
      // Si no se especifica, usar el mes actual
      const hoy = new Date();
      const anioActual = hoy.getUTCFullYear();
      const mesActual = hoy.getUTCMonth();

      fecha_desde = new Date(Date.UTC(anioActual, mesActual, 1, 0, 0, 0, 0));
      fecha_hasta = new Date(
        Date.UTC(anioActual, mesActual + 1, 0, 23, 59, 59, 999)
      );
    }

    const movimientos = await Caja.find({
      fecha: { $gte: fecha_desde, $lte: fecha_hasta },
    });

    // Agrupar por categoría
    const porCategoria = {};
    movimientos.forEach((m) => {
      if (!porCategoria[m.categoria]) {
        porCategoria[m.categoria] = { ingresos: 0, egresos: 0 };
      }
      if (m.tipo === "ingreso") {
        porCategoria[m.categoria].ingresos += m.monto;
      } else {
        porCategoria[m.categoria].egresos += m.monto;
      }
    });

    const ingresos = movimientos
      .filter((m) => m.tipo === "ingreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const egresos = movimientos
      .filter((m) => m.tipo === "egreso")
      .reduce((sum, m) => sum + m.monto, 0);

    res.json({
      periodo: {
        desde: fecha_desde,
        hasta: fecha_hasta,
      },
      resumen: {
        total_ingresos: ingresos,
        total_egresos: egresos,
        balance: ingresos - egresos,
      },
      por_categoria: porCategoria,
    });
  } catch (error) {
    console.error("Error al obtener resumen:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  registrarMovimiento,
  obtenerMovimientos,
  obtenerBalance,
  registrarIngreso,
  registrarEgreso,
  eliminarMovimiento,
  obtenerResumenPeriodo,
};
