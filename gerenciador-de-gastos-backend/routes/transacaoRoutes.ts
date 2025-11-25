import { Router } from "express";
import { registrarTransacao, listarTransacoesPorUsuario, editarTransacao, excluirTransacao } from "../controllers/transacaoController";

const router = Router();

router.post("/transacao", registrarTransacao);
router.get("/transacoes/:usuarioId", listarTransacoesPorUsuario);
router.put("/transacao/:id", editarTransacao);
router.delete("/transacao/:id", excluirTransacao);


export default router;