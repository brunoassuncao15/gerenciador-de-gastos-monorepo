"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarUsuario = cadastrarUsuario;
exports.loginUsuario = loginUsuario;
const db_1 = __importDefault(require("../db"));
// import bcrypt from "bcryptjs";
async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }
    let connection;
    try {
        connection = await db_1.default.getConnection();
        const [rows] = await connection.execute("SELECT email FROM usuarios WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(409).json({ mensagem: "E-mail já cadastrado. Por favor, use outro." });
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(senha, salt);
        const [result] = await connection.execute("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha]);
        res.status(201).json({
            mensagem: "Cadastro realizado com sucesso!",
            usuarioId: result.insertId,
        });
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
    finally {
        if (connection)
            connection.release();
    }
}
async function loginUsuario(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
    }
    let connection;
    try {
        connection = await db_1.default.getConnection();
        const [rows] = await connection.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ mensagem: "Credenciais inválidas." });
        }
        if (String(senha).trim() !== String(user.senha).trim()) {
            return res.status(401).json({ mensagem: "Credenciais inválidas." });
        }
        res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            usuario: { id: user.id, nome: user.nome, email: user.email },
        });
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
    finally {
        if (connection)
            connection.release();
    }
}
