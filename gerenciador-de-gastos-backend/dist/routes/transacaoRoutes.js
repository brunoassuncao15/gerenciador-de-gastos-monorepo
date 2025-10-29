"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transacaoController_1 = require("../controllers/transacaoController");
const router = (0, express_1.Router)();
router.post("/transacao", transacaoController_1.registrarTransacao);
router.get("/transacoes/:usuarioId", transacaoController_1.listarTransacoesPorUsuario);
exports.default = router;
