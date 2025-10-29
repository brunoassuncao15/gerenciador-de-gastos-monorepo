import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes";
import transacaoRoutes from "./routes/transacaoRoutes";


const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", usuarioRoutes);
app.use("/api", transacaoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});