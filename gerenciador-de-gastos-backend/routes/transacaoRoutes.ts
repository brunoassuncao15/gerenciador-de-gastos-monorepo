import { Router } from "express";
import { registrarTransacao, listarTransacoesPorUsuario } from "../controllers/transacaoController";

const router = Router();

router.post("/transacao", registrarTransacao);
router.get("/transacoes/:usuarioId", listarTransacoesPorUsuario);

export default router;