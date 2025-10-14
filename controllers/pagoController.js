// // controllers/pagoController.js
// const Pago = require("../model/pago-model");
// const Usuario = require("../model/usuario-model");

// // ✅ Registrar un pago (admin)
// const registrarPago = async (req, res) => {
//   try {
//     const { id_usuario, tipoPago, formaPago, monto } = req.body;

//     if (!id_usuario || !tipoPago || !formaPago || !monto) {
//       return res.status(400).json({ msg: "Todos los campos son obligatorios" });
//     }

//     let nuevoPago = new Pago({
//       id_usuario,
//       tipoPago,
//       formaPago,
//       monto,
//       estado: tipoPago === "Cuenta corriente" ? "Pendiente" : "Pagado",
//     });

//     // Si es cuenta corriente, sumar al saldo actual
//     if (tipoPago === "Cuenta corriente") {
//       const saldoActual = await Pago.aggregate([
//         { $match: { id_usuario: nuevoPago.id_usuario } },
//         { $group: { _id: null, saldoTotal: { $sum: "$saldo" } } },
//       ]);

//       const saldoPrevio =
//         saldoActual.length > 0 ? saldoActual[0].saldoTotal : 0;
//       nuevoPago.saldo = saldoPrevio + monto;
//     }

//     await nuevoPago.save();
//     res
//       .status(201)
//       .json({ msg: "Pago registrado correctamente", pago: nuevoPago });
//   } catch (error) {
//     console.error("Error al registrar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar pagos por usuario (estado de cuenta)
// const listarPagosPorUsuario = async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

//     const usuario = await Usuario.findOne({ email });
//     if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

//     const pagos = await Pago.find({ id_usuario: usuario._id }).sort({
//       fechaPago: -1,
//     });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar pagos por usuario:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar todos los pagos (vista administrador)
// const listarTodosLosPagos = async (req, res) => {
//   try {
//     const pagos = await Pago.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar todos los pagos:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// module.exports = {
//   registrarPago,
//   listarPagosPorUsuario,
//   listarTodosLosPagos,
// };

// // controllers/pagoController.js
// const Pago = require("../model/pago-model");
// const Usuario = require("../model/usuario-model");

// // ✅ Registrar un pago (admin)
// const registrarPago = async (req, res) => {
//   try {
//     const { id_usuario, tipoPago, formaPago, monto } = req.body;

//     if (!id_usuario || !tipoPago || !formaPago || !monto) {
//       return res.status(400).json({ msg: "Todos los campos son obligatorios" });
//     }

//     let nuevoPago = new Pago({
//       id_usuario,
//       tipoPago,
//       formaPago,
//       monto,
//       estado: tipoPago === "Cuenta corriente" ? "Pendiente" : "Pagado",
//     });

//     // Si es cuenta corriente, sumar al saldo actual
//     if (tipoPago === "Cuenta corriente") {
//       const saldoActual = await Pago.aggregate([
//         { $match: { id_usuario: nuevoPago.id_usuario } },
//         { $group: { _id: null, saldoTotal: { $sum: "$saldo" } } },
//       ]);

//       const saldoPrevio =
//         saldoActual.length > 0 ? saldoActual[0].saldoTotal : 0;
//       nuevoPago.saldo = saldoPrevio + monto;
//     }

//     await nuevoPago.save();
//     res
//       .status(201)
//       .json({ msg: "Pago registrado correctamente", pago: nuevoPago });
//   } catch (error) {
//     console.error("Error al registrar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar pagos por usuario (estado de cuenta)
// const listarPagosPorUsuario = async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

//     const usuario = await Usuario.findOne({ email });
//     if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

//     const pagos = await Pago.find({ id_usuario: usuario._id }).sort({
//       fechaPago: -1,
//     });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar pagos por usuario:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar todos los pagos (vista administrador)
// const listarTodosLosPagos = async (req, res) => {
//   try {
//     const pagos = await Pago.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar todos los pagos:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Editar pago
// const editarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { id_usuario, tipoPago, formaPago, monto } = req.body;

//     const pagoActualizado = await Pago.findByIdAndUpdate(
//       id,
//       { id_usuario, tipoPago, formaPago, monto },
//       { new: true }
//     );

//     if (!pagoActualizado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     res.json({ msg: "Pago actualizado correctamente", pago: pagoActualizado });
//   } catch (error) {
//     console.error("Error al editar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Eliminar pago
// const eliminarPago = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const pagoEliminado = await Pago.findByIdAndDelete(id);
//     if (!pagoEliminado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     res.json({ msg: "Pago eliminado correctamente" });
//   } catch (error) {
//     console.error("Error al eliminar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// module.exports = {
//   registrarPago,
//   listarPagosPorUsuario,
//   listarTodosLosPagos,
//   editarPago,
//   eliminarPago,
// };
// // controllers/pagoController.js
// const Pago = require("../model/pago-model");
// const Usuario = require("../model/usuario-model");
// const Clase = require("../model/clase-model");

// // ✅ Registrar un pago (admin)
// const registrarPago = async (req, res) => {
//   try {
//     const { id_usuario, id_clase, tipoPago, formaPago, monto } = req.body;

//     if (!id_usuario || !id_clase || !tipoPago || !formaPago || !monto) {
//       return res.status(400).json({ msg: "Todos los campos son obligatorios" });
//     }

//     // Buscar la clase para obtener el precio
//     const clase = await Clase.findById(id_clase);
//     if (!clase) return res.status(404).json({ msg: "Clase no encontrada" });

//     // Calcular saldo = precio de la clase - monto pagado
//     const saldoCalculado = clase.precio - monto;

//     const nuevoPago = new Pago({
//       id_usuario,
//       id_clase,
//       tipoPago,
//       formaPago,
//       monto,
//       saldo: saldoCalculado > 0 ? saldoCalculado : 0,
//       estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
//     });

//     await nuevoPago.save();

//     res.status(201).json({
//       msg: "Pago registrado correctamente",
//       pago: nuevoPago,
//     });
//   } catch (error) {
//     console.error("Error al registrar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar pagos por usuario (estado de cuenta)
// const listarPagosPorUsuario = async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

//     const usuario = await Usuario.findOne({ email });
//     if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

//     const pagos = await Pago.find({ id_usuario: usuario._id })
//       .populate("id_clase", "nombre_clase precio")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar pagos por usuario:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar todos los pagos (vista administrador)
// const listarTodosLosPagos = async (req, res) => {
//   try {
//     const pagos = await Pago.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .populate("id_clase", "nombre_clase precio")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar todos los pagos:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Editar pago
// const editarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { id_usuario, id_clase, tipoPago, formaPago, monto } = req.body;

//     // Buscar la clase para recalcular saldo
//     const clase = await Clase.findById(id_clase);
//     if (!clase) return res.status(404).json({ msg: "Clase no encontrada" });

//     const saldoCalculado = clase.precio - monto;

//     const pagoActualizado = await Pago.findByIdAndUpdate(
//       id,
//       {
//         id_usuario,
//         id_clase,
//         tipoPago,
//         formaPago,
//         monto,
//         saldo: saldoCalculado > 0 ? saldoCalculado : 0,
//         estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
//       },
//       { new: true }
//     );

//     if (!pagoActualizado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     res.json({ msg: "Pago actualizado correctamente", pago: pagoActualizado });
//   } catch (error) {
//     console.error("Error al editar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Eliminar pago
// const eliminarPago = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const pagoEliminado = await Pago.findByIdAndDelete(id);
//     if (!pagoEliminado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     res.json({ msg: "Pago eliminado correctamente" });
//   } catch (error) {
//     console.error("Error al eliminar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// module.exports = {
//   registrarPago,
//   listarPagosPorUsuario,
//   listarTodosLosPagos,
//   editarPago,
//   eliminarPago,
// };

//

// const Pago = require("../model/pago-model");
// const Usuario = require("../model/usuario-model");

// // ✅ Registrar un pago (admin)
// const registrarPago = async (req, res) => {
//   try {
//     const {
//       id_usuario,
//       tipoPago,
//       formaPago,
//       valorMensual,
//       valorPorClase,
//       montoPagado,
//     } = req.body;

//     if (!id_usuario || !tipoPago || !formaPago || !montoPagado) {
//       return res.status(400).json({ msg: "Faltan campos obligatorios" });
//     }

//     let totalAPagar = 0;

//     if (tipoPago === "Mensual" && valorMensual) {
//       totalAPagar = valorMensual;
//     } else if (tipoPago === "Por clase" && valorPorClase) {
//       totalAPagar = valorPorClase;
//     }

//     const saldoCalculado = totalAPagar > 0 ? totalAPagar - montoPagado : 0;

//     const nuevoPago = new Pago({
//       id_usuario,
//       tipoPago,
//       formaPago,
//       valorMensual,
//       valorPorClase,
//       montoPagado,
//       saldo: saldoCalculado > 0 ? saldoCalculado : 0,
//       estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
//     });

//     await nuevoPago.save();

//     res.status(201).json({
//       msg: "Pago registrado correctamente",
//       pago: nuevoPago,
//     });
//   } catch (error) {
//     console.error("Error al registrar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar pagos por usuario (estado de cuenta)
// const listarPagosPorUsuario = async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

//     const usuario = await Usuario.findOne({ email });
//     if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

//     const pagos = await Pago.find({ id_usuario: usuario._id })
//       .populate("id_usuario", "nombre_usuario email")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar pagos por usuario:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar todos los pagos (vista administrador)
// const listarTodosLosPagos = async (req, res) => {
//   try {
//     const pagos = await Pago.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar todos los pagos:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Editar pago
// const editarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { tipoPago, formaPago, valorMensual, valorPorClase, montoPagado } =
//       req.body;

//     let totalAPagar = 0;
//     if (tipoPago === "Mensual" && valorMensual) {
//       totalAPagar = valorMensual;
//     } else if (tipoPago === "Por clase" && valorPorClase) {
//       totalAPagar = valorPorClase;
//     }

//     const saldoCalculado = totalAPagar > 0 ? totalAPagar - montoPagado : 0;

//     const pagoActualizado = await Pago.findByIdAndUpdate(
//       id,
//       {
//         tipoPago,
//         formaPago,
//         valorMensual,
//         valorPorClase,
//         montoPagado,
//         saldo: saldoCalculado > 0 ? saldoCalculado : 0,
//         estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
//       },
//       { new: true }
//     );

//     if (!pagoActualizado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     res.json({ msg: "Pago actualizado correctamente", pago: pagoActualizado });
//   } catch (error) {
//     console.error("Error al editar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Eliminar pago
// const eliminarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pagoEliminado = await Pago.findByIdAndDelete(id);
//     if (!pagoEliminado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }
//     res.json({ msg: "Pago eliminado correctamente" });
//   } catch (error) {
//     console.error("Error al eliminar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// module.exports = {
//   registrarPago,
//   listarPagosPorUsuario,
//   listarTodosLosPagos,
//   editarPago,
//   eliminarPago,
// };

// esto funciona ok
// const Pago = require("../model/pago-model");
// const Usuario = require("../model/usuario-model");

// // ✅ Registrar un pago (admin) con pagos parciales
// const registrarPago = async (req, res) => {
//   try {
//     const { id_usuario, tipoPago, formaPago, montoPagado } = req.body;

//     if (!id_usuario || !tipoPago || !formaPago || !montoPagado) {
//       return res.status(400).json({ msg: "Faltan campos obligatorios" });
//     }

//     // Buscar pago pendiente del usuario del mismo tipo
//     let pagoExistente = await Pago.findOne({
//       id_usuario,
//       tipoPago,
//       estado: "Pendiente",
//     });

//     // Si existe pago pendiente, actualizar saldo
//     if (pagoExistente) {
//       const totalAPagar =
//         tipoPago === "Mensual"
//           ? pagoExistente.valorMensual
//           : pagoExistente.valorPorClase;

//       pagoExistente.montoPagado += montoPagado;
//       pagoExistente.saldo = Math.max(
//         totalAPagar - pagoExistente.montoPagado,
//         0
//       );
//       pagoExistente.estado = pagoExistente.saldo > 0 ? "Pendiente" : "Pagado";
//       pagoExistente.formaPago = formaPago; // actualizar forma de pago si se desea

//       await pagoExistente.save();

//       return res.status(200).json({
//         msg: "Pago actualizado correctamente",
//         pago: pagoExistente,
//       });
//     }

//     // Si no existe pago pendiente, crear nuevo pago
//     const { valorMensual = 0, valorPorClase = 0 } = req.body;
//     const totalAPagar = tipoPago === "Mensual" ? valorMensual : valorPorClase;

//     const saldoCalculado = totalAPagar - montoPagado;

//     const nuevoPago = new Pago({
//       id_usuario,
//       tipoPago,
//       formaPago,
//       valorMensual,
//       valorPorClase,
//       montoPagado,
//       saldo: saldoCalculado > 0 ? saldoCalculado : 0,
//       estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
//     });

//     await nuevoPago.save();

//     res.status(201).json({
//       msg: "Pago registrado correctamente",
//       pago: nuevoPago,
//     });
//   } catch (error) {
//     console.error("Error al registrar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar pagos por usuario (estado de cuenta)
// const listarPagosPorUsuario = async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

//     const usuario = await Usuario.findOne({ email });
//     if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

//     const pagos = await Pago.find({ id_usuario: usuario._id })
//       .populate("id_usuario", "nombre_usuario email")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar pagos por usuario:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Listar todos los pagos (vista administrador)
// const listarTodosLosPagos = async (req, res) => {
//   try {
//     const pagos = await Pago.find()
//       .populate("id_usuario", "nombre_usuario email")
//       .sort({ fechaPago: -1 });

//     res.json({ pagos });
//   } catch (error) {
//     console.error("Error al listar todos los pagos:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Editar pago
// const editarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { tipoPago, formaPago, valorMensual, valorPorClase, montoPagado } =
//       req.body;

//     let totalAPagar = 0;
//     if (tipoPago === "Mensual" && valorMensual) {
//       totalAPagar = valorMensual;
//     } else if (tipoPago === "Por clase" && valorPorClase) {
//       totalAPagar = valorPorClase;
//     }

//     const saldoCalculado = totalAPagar > 0 ? totalAPagar - montoPagado : 0;

//     const pagoActualizado = await Pago.findByIdAndUpdate(
//       id,
//       {
//         tipoPago,
//         formaPago,
//         valorMensual,
//         valorPorClase,
//         montoPagado,
//         saldo: saldoCalculado > 0 ? saldoCalculado : 0,
//         estado: saldoCalculado > 0 ? "Pendiente" : "Pagado",
//       },
//       { new: true }
//     );

//     if (!pagoActualizado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }

//     res.json({ msg: "Pago actualizado correctamente", pago: pagoActualizado });
//   } catch (error) {
//     console.error("Error al editar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// // ✅ Eliminar pago
// const eliminarPago = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pagoEliminado = await Pago.findByIdAndDelete(id);
//     if (!pagoEliminado) {
//       return res.status(404).json({ msg: "Pago no encontrado" });
//     }
//     res.json({ msg: "Pago eliminado correctamente" });
//   } catch (error) {
//     console.error("Error al eliminar pago:", error);
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// };

// module.exports = {
//   registrarPago,
//   listarPagosPorUsuario,
//   listarTodosLosPagos,
//   editarPago,
//   eliminarPago,
// };

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

module.exports = {
  registrarPago,
  listarPagosPorUsuario,
  listarTodosLosPagos,
  editarPago,
  eliminarPago,
};
