const CierreCaja = require("../model/cierre-caja-model");
const Caja = require("../model/caja-model");
const Pago = require("../model/pago-model");
const PagoProfesor = require("../model/pago-profesor-model");

// ✅ Obtener datos para el cierre (sin cerrarlo aún) - CORREGIDO
const obtenerDatosParaCierre = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;

    let fechaInicio, fechaFin;

    if (fecha_inicio && fecha_fin) {
      // ✅ CORRECCIÓN: Agregar la hora en UTC para evitar conversión de zona horaria
      fechaInicio = new Date(fecha_inicio + "T00:00:00.000Z");
      fechaFin = new Date(fecha_fin + "T23:59:59.999Z");
    } else {
      // Por defecto: hoy
      const hoy = new Date();
      const fechaHoyStr = hoy.toISOString().split("T")[0];
      fechaInicio = new Date(fechaHoyStr + "T00:00:00.000Z");
      fechaFin = new Date(fechaHoyStr + "T23:59:59.999Z");
    }

    // Obtener movimientos del período
    const movimientos = await Caja.find({
      fecha: { $gte: fechaInicio, $lte: fechaFin },
    });

    // Calcular totales
    const ingresos = movimientos
      .filter((m) => m.tipo === "ingreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const egresos = movimientos
      .filter((m) => m.tipo === "egreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const balance = ingresos - egresos;

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

    // 🔥 PAGOS DE ALUMNOS - Separar por forma de pago
    const pagosAlumnos = await Pago.find({
      fechaPago: { $gte: fechaInicio, $lte: fechaFin },
      estado: { $ne: "Cancelado" },
    });

    // Ingresos en EFECTIVO
    const ingresosEfectivoAlumnos = pagosAlumnos
      .filter((p) => p.formaPago === "Efectivo")
      .reduce((sum, p) => sum + p.montoPagado, 0);

    // Ingresos en TRANSFERENCIA
    const ingresosTransferenciaAlumnos = pagosAlumnos
      .filter((p) => p.formaPago === "Transferencia")
      .reduce((sum, p) => sum + p.montoPagado, 0);

    // 🔥 PAGOS A PROFESORES - Todo en efectivo
    const pagosProfesores = await PagoProfesor.find({
      fecha_pago: { $gte: fechaInicio, $lte: fechaFin },
      estado: "pagado",
    });

    const egresosProfesores = pagosProfesores.reduce(
      (sum, p) => sum + p.monto_total,
      0
    );

    // 🔥 MOVIMIENTOS MANUALES
    const movimientosEfectivo = movimientos.filter(
      (m) => m.categoria === "otro" || m.categoria === "gasto_operativo"
    );

    const ingresosEfectivoManuales = movimientosEfectivo
      .filter((m) => m.tipo === "ingreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const egresosEfectivoManuales = movimientosEfectivo
      .filter((m) => m.tipo === "egreso")
      .reduce((sum, m) => sum + m.monto, 0);

    // 🔥 CÁLCULOS FINALES
    // EFECTIVO = Ingresos efectivo - Egresos efectivo
    const efectivoSistema =
      ingresosEfectivoAlumnos +
      ingresosEfectivoManuales -
      (egresosProfesores + egresosEfectivoManuales);

    // TRANSFERENCIAS = Solo ingresos (no hay egresos por transferencia)
    const transferenciaSistema = ingresosTransferenciaAlumnos;

    res.json({
      periodo: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      },
      totales: {
        ingresos,
        egresos,
        balance,
        cantidad_movimientos: movimientos.length,
      },
      detalles_por_categoria: porCategoria,
      arqueo: {
        efectivo_sistema: efectivoSistema,
        transferencia_sistema: transferenciaSistema,
        desglose: {
          ingresos_efectivo_alumnos: ingresosEfectivoAlumnos,
          ingresos_transferencia_alumnos: ingresosTransferenciaAlumnos,
          ingresos_efectivo_manuales: ingresosEfectivoManuales,
          egresos_profesores: egresosProfesores,
          egresos_efectivo_manuales: egresosEfectivoManuales,
        },
      },
      movimientos: movimientos.slice(0, 10),
    });
  } catch (error) {
    console.error("Error al obtener datos para cierre:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Realizar cierre de caja - CORREGIDO
const realizarCierre = async (req, res) => {
  try {
    const {
      fecha_inicio,
      fecha_fin,
      efectivo_fisico,
      transferencia_fisica,
      observaciones,
    } = req.body;

    if (!fecha_inicio || !fecha_fin) {
      return res.status(400).json({ msg: "Las fechas son obligatorias" });
    }

    // ✅ CORRECCIÓN: Agregar la hora en UTC
    const fechaInicio = new Date(fecha_inicio + "T00:00:00.000Z");
    const fechaFin = new Date(fecha_fin + "T23:59:59.999Z");

    // Verificar si ya existe un cierre para este período
    const cierreExistente = await CierreCaja.findOne({
      "periodo.fecha_inicio": fechaInicio,
      "periodo.fecha_fin": fechaFin,
      estado: "cerrado",
    });

    if (cierreExistente) {
      return res.status(400).json({
        msg: "Ya existe un cierre para este período",
        cierre: cierreExistente,
      });
    }

    // Obtener movimientos del período
    const movimientos = await Caja.find({
      fecha: { $gte: fechaInicio, $lte: fechaFin },
    });

    // Calcular totales
    const ingresos = movimientos
      .filter((m) => m.tipo === "ingreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const egresos = movimientos
      .filter((m) => m.tipo === "egreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const balance = ingresos - egresos;

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

    // 🔥 PAGOS DE ALUMNOS
    const pagosAlumnos = await Pago.find({
      fechaPago: { $gte: fechaInicio, $lte: fechaFin },
      estado: { $ne: "Cancelado" },
    });

    const ingresosEfectivoAlumnos = pagosAlumnos
      .filter((p) => p.formaPago === "Efectivo")
      .reduce((sum, p) => sum + p.montoPagado, 0);

    const ingresosTransferenciaAlumnos = pagosAlumnos
      .filter((p) => p.formaPago === "Transferencia")
      .reduce((sum, p) => sum + p.montoPagado, 0);

    // 🔥 PAGOS A PROFESORES
    const pagosProfesores = await PagoProfesor.find({
      fecha_pago: { $gte: fechaInicio, $lte: fechaFin },
      estado: "pagado",
    });

    const egresosProfesores = pagosProfesores.reduce(
      (sum, p) => sum + p.monto_total,
      0
    );

    // 🔥 MOVIMIENTOS MANUALES
    const movimientosEfectivo = movimientos.filter(
      (m) => m.categoria === "otro" || m.categoria === "gasto_operativo"
    );

    const ingresosEfectivoManuales = movimientosEfectivo
      .filter((m) => m.tipo === "ingreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const egresosEfectivoManuales = movimientosEfectivo
      .filter((m) => m.tipo === "egreso")
      .reduce((sum, m) => sum + m.monto, 0);

    // 🔥 CÁLCULOS FINALES
    const efectivoSistema =
      ingresosEfectivoAlumnos +
      ingresosEfectivoManuales -
      (egresosProfesores + egresosEfectivoManuales);
    const transferenciaSistema = ingresosTransferenciaAlumnos;

    const efectivoFisico = Number(efectivo_fisico) || 0;
    const transferenciaFisica = Number(transferencia_fisica) || 0;

    const diferenciaEfectivo = efectivoFisico - efectivoSistema;
    const diferenciaTransferencia = transferenciaFisica - transferenciaSistema;

    // Crear cierre
    const cierre = new CierreCaja({
      periodo: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      },
      totales: {
        ingresos,
        egresos,
        balance,
        cantidad_movimientos: movimientos.length,
      },
      detalles_por_categoria: porCategoria,
      detalles_por_forma_pago: {
        efectivo: efectivoSistema,
        transferencia: transferenciaSistema,
      },
      arqueo: {
        efectivo_sistema: efectivoSistema,
        efectivo_fisico: efectivoFisico,
        diferencia: diferenciaEfectivo,
        transferencia_sistema: transferenciaSistema,
        transferencia_fisica: transferenciaFisica,
        diferencia_transferencia: diferenciaTransferencia,
      },
      observaciones,
      estado: "cerrado",
    });

    await cierre.save();

    res.status(201).json({
      msg: "Cierre de caja realizado exitosamente",
      cierre,
    });
  } catch (error) {
    console.error("Error al realizar cierre:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Listar todos los cierres
const listarCierres = async (req, res) => {
  try {
    const cierres = await CierreCaja.find()
      .sort({ fecha_cierre: -1 })
      .limit(50);

    res.json({ cierres });
  } catch (error) {
    console.error("Error al listar cierres:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Obtener un cierre específico
const obtenerCierre = async (req, res) => {
  try {
    const { id } = req.params;
    const cierre = await CierreCaja.findById(id);

    if (!cierre) {
      return res.status(404).json({ msg: "Cierre no encontrado" });
    }

    const movimientos = await Caja.find({
      fecha: {
        $gte: cierre.periodo.fecha_inicio,
        $lte: cierre.periodo.fecha_fin,
      },
    }).sort({ fecha: -1 });

    res.json({
      cierre,
      movimientos,
    });
  } catch (error) {
    console.error("Error al obtener cierre:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Eliminar cierre
const eliminarCierre = async (req, res) => {
  try {
    const { id } = req.params;

    const cierre = await CierreCaja.findById(id);
    if (!cierre) {
      return res.status(404).json({ msg: "Cierre no encontrado" });
    }

    await CierreCaja.findByIdAndDelete(id);

    res.json({ msg: "Cierre eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar cierre:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Verificar si hay cierre para hoy - CORREGIDO
const verificarCierreHoy = async (req, res) => {
  try {
    const hoy = new Date();
    const fechaHoyStr = hoy.toISOString().split("T")[0];
    const inicioHoy = new Date(fechaHoyStr + "T00:00:00.000Z");
    const finHoy = new Date(fechaHoyStr + "T23:59:59.999Z");

    const cierreHoy = await CierreCaja.findOne({
      "periodo.fecha_inicio": { $gte: inicioHoy },
      "periodo.fecha_fin": { $lte: finHoy },
      estado: "cerrado",
    });

    res.json({
      tiene_cierre: !!cierreHoy,
      cierre: cierreHoy,
    });
  } catch (error) {
    console.error("Error al verificar cierre de hoy:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerDatosParaCierre,
  realizarCierre,
  listarCierres,
  obtenerCierre,
  eliminarCierre,
  verificarCierreHoy,
};
