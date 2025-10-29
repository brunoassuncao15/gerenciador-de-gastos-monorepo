"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarTransacoesPorUsuario = void 0;
exports.registrarTransacao = registrarTransacao;
const db_1 = __importDefault(require("../db"));
async function registrarTransacao(req, res) {
    const { usuarioId, tipo, valor, descricao, data } = req.body;
    if (usuarioId === undefined ||
        usuarioId === null ||
        !tipo ||
        !valor ||
        !descricao ||
        !data) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }
    let connection;
    try {
        connection = await db_1.default.getConnection();
        const [userRows] = await connection.execute("SELECT nome FROM usuarios WHERE id = ?", [usuarioId]);
        if (userRows.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
        const nomeUsuario = userRows[0].nome;
        await connection.execute("INSERT INTO transacoes (usuario_id, nome_usuario, tipo, valor, descricao, data) VALUES (?, ?, ?, ?, ?, ?)", [usuarioId, nomeUsuario, tipo, valor, descricao, data]);
        res.status(201).json({ mensagem: "Transação registrada com sucesso!" });
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
    finally {
        if (connection)
            connection.release();
    }
}
const listarTransacoesPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    let connection;
    try {
        connection = await db_1.default.getConnection();
        const [transacoes] = await connection.execute("SELECT * FROM transacoes WHERE usuario_id = ? ORDER BY data DESC", [usuarioId]);
        res.json(transacoes);
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar transações do usuário." });
    }
    finally {
        if (connection)
            connection.release();
    }
};
exports.listarTransacoesPorUsuario = listarTransacoesPorUsuario;
