import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./db";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/cadastrar", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute(
      "SELECT email FROM usuarios WHERE email = ?",
      [email]
    );
    if ((rows as any[]).length > 0) {
      return res
        .status(409)
        .json({ mensagem: "E-mail já cadastrado. Por favor, use outro." });
    }

    // Em um projeto real, você faria o hash da senha aqui antes de salvar!
    const [result] = await connection.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );

    console.log(`Usuário "${nome}" cadastrado com ID: ${(result as any).insertId}`);

    res.status(201).json({
      mensagem: "Cadastro realizado com sucesso!",
      usuarioId: (result as any).insertId,
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  } finally {

    if (connection) {
      connection.release();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
