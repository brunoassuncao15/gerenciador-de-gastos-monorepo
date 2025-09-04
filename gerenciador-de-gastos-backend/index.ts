import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./db";

const app = express();
const PORT = 3001;

const bcrypt = require("bcryptjs");

app.use(cors());
app.use(bodyParser.json());

app.post("/api/cadastrar", async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection: any;
  try {
    connection = await pool.getConnection();

    const [rows]: [any[], any] = await connection.execute(
      "SELECT email FROM usuarios WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      return res
        .status(409)
        .json({ mensagem: "E-mail já cadastrado. Por favor, use outro." });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(senha, salt);

    const [result]: [any, any] = await connection.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );

    console.log(`Usuário "${nome}" cadastrado com ID: ${result.insertId}`);

    res.status(201).json({
      mensagem: "Cadastro realizado com sucesso!",
      usuarioId: result.insertId,
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

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Email e senha são obrigatórios." });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    const [rows]: [any[], any] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    if (String(senha).trim() !== String(user.senha).trim()) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    console.log(`Login bem-sucedido para o usuário: ${user.email}`);
    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      usuario: { id: user.id, nome: user.nome, email: user.email },
    });
  } catch (error) {
    console.error("Erro no login:", error);
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
