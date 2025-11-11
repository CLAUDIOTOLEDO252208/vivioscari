const Pago = require("../model/pago-model");
const Usuario = require("../model/usuario-model");
const { registrarMovimiento } = require("./cajaController");

// ✅ Registrar un pago (admin) con pagos parciales
const registrarPago = async (req, res) => {
  try {
    const { id_usuario, tipoPago, formaPago, montoPagado } = req.body;

    if (!id_usuario || !tipoPago || !formaPago || !montoPagado) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    // Buscar usuario para obtener su nombre
    const usuario = await Usuario.findById(id_usuario);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Buscar pago pendiente del usuario del mismo tipo
    let pagoExistente = await Pago.findOne({
      id_usuario,
      tipoPago,
      estado: "Pendiente",
    });

    // Si existe pago pendiente, actualizar saldo
    if (pagoExistente) {
      const totalAPagar =
        tipoPago === "Mensual"
          ? pagoExistente.valorMensual
          : pagoExistente.valorPorClase;

      pagoExistente.montoPagado += montoPagado;
      pagoExistente.saldo = Math.max(
        totalAPagar - pagoExistente.montoPagado,
        0
      );
      pagoExistente.estado = pagoExistente.saldo > 0 ? "Pendiente" : "Pagado";
      pagoExistente.formaPago = formaPago;

      await pagoExistente.save();

      // 🔥 REGISTRAR EN CAJA - Pago parcial
      await registrarMovimiento({
        tipo: "ingreso",
        concepto: `Pago ${tipoPago} - ${usuario.nombre_usuario} (${formaPago})`,
        monto: Number(montoPagado),
        categoria: "pago_clase",
        referencia_id: pagoExistente._id,
        referencia_tipo: "Pago",
        observaciones:
          pagoExistente.saldo > 0
            ? `Pago parcial. Saldo restante: $${pagoExistente.saldo}`
            : "Pago completo",
      });

      return res.status(200).json({
        msg: "Pago actualizado correctamente",
        pago: pagoExistente,
      });
    }

    // Si no existe pago pendiente, crear nuevo pago
    const { valorMensual = 0, valorPorClase = 0 } = req.body;
    const totalAPagar = tipoPago === "Mensual" ? valorMensual : valorPorClase;

    const saldoCalculado = totalAPagar - montoPagado;

    const nuevoPago = new Pago({
      id_usuario,
      tipoPago,
      formaPago,
      valorMensual,
      valorPorClase,
      montoPagado,
      saldo: saldoCalculado > 0 ? saldoCalculado : 0,
      estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
    });

    await nuevoPago.save();

    // 🔥 REGISTRAR EN CAJA - Nuevo pago
    await registrarMovimiento({
      tipo: "ingreso",
      concepto: `Pago ${tipoPago} - ${usuario.nombre_usuario} (${formaPago})`,
      monto: Number(montoPagado),
      categoria: "pago_clase",
      referencia_id: nuevoPago._id,
      referencia_tipo: "Pago",
      observaciones:
        saldoCalculado > 0
          ? `Pago parcial. Saldo restante: $${saldoCalculado}`
          : "Pago completo",
    });

    res.status(201).json({
      msg: "Pago registrado correctamente",
      pago: nuevoPago,
    });
  } catch (error) {
    console.error("Error al registrar pago:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Listar pagos por usuario (estado de cuenta)
const listarPagosPorUsuario = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    const pagos = await Pago.find({ id_usuario: usuario._id })
      .populate("id_usuario", "nombre_usuario email")
      .sort({ fechaPago: -1 });

    res.json({ pagos });
  } catch (error) {
    console.error("Error al listar pagos por usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Listar todos los pagos (vista administrador)
const listarTodosLosPagos = async (req, res) => {
  try {
    const pagos = await Pago.find()
      .populate("id_usuario", "nombre_usuario email")
      .sort({ fechaPago: -1 });

    res.json({ pagos });
  } catch (error) {
    console.error("Error al listar todos los pagos:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Editar pago
const editarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipoPago, formaPago, valorMensual, valorPorClase, montoPagado } =
      req.body;

    let totalAPagar = 0;
    if (tipoPago === "Mensual" && valorMensual) {
      totalAPagar = valorMensual;
    } else if (tipoPago === "Por clase" && valorPorClase) {
      totalAPagar = valorPorClase;
    }

    const saldoCalculado = totalAPagar > 0 ? totalAPagar - montoPagado : 0;

    const pagoActualizado = await Pago.findByIdAndUpdate(
      id,
      {
        tipoPago,
        formaPago,
        valorMensual,
        valorPorClase,
        montoPagado,
        saldo: saldoCalculado > 0 ? saldoCalculado : 0,
        estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
      },
      { new: true }
    );

    if (!pagoActualizado) {
      return res.status(404).json({ msg: "Pago no encontrado" });
    }

    res.json({ msg: "Pago actualizado correctamente", pago: pagoActualizado });
  } catch (error) {
    console.error("Error al editar pago:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// ✅ Eliminar pago
const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const pagoEliminado = await Pago.findByIdAndDelete(id);
    if (!pagoEliminado) {
      return res.status(404).json({ msg: "Pago no encontrado" });
    }
    res.json({ msg: "Pago eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar pago:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// 🔥 NUEVO: Estado de cuenta detallado de un alumno específico
const obtenerEstadoCuentaAlumno = async (req, res) => {
  try {
    const { id } = req.params; // ID del usuario

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Obtener todos los pagos del usuario
    const pagos = await Pago.find({ id_usuario: id }).sort({ fechaPago: -1 });

    // Calcular totales
    const totalPagado = pagos.reduce((sum, p) => sum + p.montoPagado, 0);
    const totalSaldo = pagos
      .filter((p) => p.estado === "Pendiente")
      .reduce((sum, p) => sum + p.saldo, 0);

    // Separar pagos por estado
    const pagosPendientes = pagos.filter((p) => p.estado === "Pendiente");
    const pagosCompletados = pagos.filter((p) => p.estado === "Pagado");

    // Último pago
    const ultimoPago = pagos.length > 0 ? pagos[0] : null;

    res.json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre_usuario,
        email: usuario.email,
      },
      resumen: {
        total_pagos: pagos.length,
        total_pagado: totalPagado,
        saldo_pendiente: totalSaldo,
        pagos_pendientes: pagosPendientes.length,
        pagos_completados: pagosCompletados.length,
      },
      ultimo_pago: ultimoPago,
      pagos_pendientes: pagosPendientes,
      historial_pagos: pagos,
    });
  } catch (error) {
    console.error("Error al obtener estado de cuenta:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// 🔥 NUEVO: Listar todos los alumnos con saldo pendiente
const listarAlumnosConSaldo = async (req, res) => {
  try {
    // Buscar todos los pagos pendientes
    const pagosPendientes = await Pago.find({ estado: "Pendiente" })
      .populate("id_usuario", "nombre_usuario email")
      .sort({ fechaPago: -1 });

    // Agrupar por usuario
    const alumnosConSaldo = {};

    pagosPendientes.forEach((pago) => {
      const userId = pago.id_usuario._id.toString();

      if (!alumnosConSaldo[userId]) {
        alumnosConSaldo[userId] = {
          usuario: {
            id: pago.id_usuario._id,
            nombre: pago.id_usuario.nombre_usuario,
            email: pago.id_usuario.email,
          },
          saldo_total: 0,
          cantidad_pagos_pendientes: 0,
          pagos_pendientes: [],
        };
      }

      alumnosConSaldo[userId].saldo_total += pago.saldo;
      alumnosConSaldo[userId].cantidad_pagos_pendientes++;
      alumnosConSaldo[userId].pagos_pendientes.push({
        id: pago._id,
        tipoPago: pago.tipoPago,
        saldo: pago.saldo,
        montoPagado: pago.montoPagado,
        fechaPago: pago.fechaPago,
      });
    });

    // Convertir objeto a array
    const listaAlumnos = Object.values(alumnosConSaldo);

    // Ordenar por saldo (de mayor a menor)
    listaAlumnos.sort((a, b) => b.saldo_total - a.saldo_total);

    // Calcular totales generales
    const totalSaldoGeneral = listaAlumnos.reduce(
      (sum, a) => sum + a.saldo_total,
      0
    );

    res.json({
      alumnos: listaAlumnos,
      resumen: {
        total_alumnos_con_saldo: listaAlumnos.length,
        saldo_total_general: totalSaldoGeneral,
      },
    });
  } catch (error) {
    console.error("Error al listar alumnos con saldo:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  registrarPago,
  listarPagosPorUsuario,
  listarTodosLosPagos,
  editarPago,
  eliminarPago,
  obtenerEstadoCuentaAlumno, // 👈 NUEVO
  listarAlumnosConSaldo, // 👈 NUEVO
};
