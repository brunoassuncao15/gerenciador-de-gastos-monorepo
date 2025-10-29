"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = (0, express_1.Router)();
router.post("/cadastrar", usuarioController_1.cadastrarUsuario);
router.post("/login", usuarioController_1.loginUsuario);
exports.default = router;
