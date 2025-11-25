import { Request, Response } from "express";
import pool from "../db";

export async function registrarTransacao(req: Request, res: Response) {
  const { usuarioId, tipo, valor, descricao, data } = req.body;

  if (
    usuarioId === undefined ||
    usuarioId === null ||
    !tipo ||
    !valor ||
    !descricao ||
    !data
  ) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection: any;
  try {
    connection = await pool.getConnection();

    const [userRows]: [any[], any] = await connection.execute(
      "SELECT nome FROM usuarios WHERE id = ?",
      [usuarioId]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    const nomeUsuario = userRows[0].nome;

    await connection.execute(
      "INSERT INTO transacoes (usuario_id, nome_usuario, tipo, valor, descricao, data) VALUES (?, ?, ?, ?, ?, ?)",
      [usuarioId, nomeUsuario, tipo, valor, descricao, data]
    );

    res.status(201).json({ mensagem: "Transação registrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  } finally {
    if (connection) connection.release();
  }
}

export const listarTransacoesPorUsuario = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  let connection: any;
  try {
    connection = await pool.getConnection();
    const [transacoes]: [any[], any] = await connection.execute(
      "SELECT * FROM transacoes WHERE usuario_id = ? ORDER BY data DESC",
      [usuarioId]
    );
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar transações do usuário." });
  } finally {
    if (connection) connection.release();
  }
};

export const editarTransacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tipo, valor, descricao, data } = req.body;

  if (!tipo || !valor || !descricao || !data) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection: any;
  try {
    connection = await pool.getConnection();

    const [result]: [any, any] = await connection.execute(
      "UPDATE transacoes SET tipo = ?, valor = ?, descricao = ?, data = ? WHERE id = ?",
      [tipo, valor, descricao, data, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    res.json({ mensagem: "Transação editada com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao editar transação." });
  } finally {
    if (connection) connection.release();
  }
};

export const excluirTransacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  let connection: any;
  try {
    connection = await pool.getConnection();

    const [result]: [any, any] = await connection.execute(
      "DELETE FROM transacoes WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    res.json({ mensagem: "Transação excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir transação." });
  } finally {
    if (connection) connection.release();
  }
};