"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.post("/api/cadastrar", async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res
            .status(400)
            .json({ mensagem: "Todos os campos são obrigatórios." });
    }
    let connection;
    try {
        connection = await db_1.default.getConnection();
        const [rows] = await connection.execute("SELECT email FROM usuarios WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res
                .status(409)
                .json({ mensagem: "E-mail já cadastrado. Por favor, use outro." });
        }
        // Em um projeto real, você faria o hash da senha aqui antes de salvar!
        const [result] = await connection.execute("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha]);
        console.log(`Usuário "${nome}" cadastrado com ID: ${result.insertId}`);
        res.status(201).json({
            mensagem: "Cadastro realizado com sucesso!",
            usuarioId: result.insertId,
        });
    }
    catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
