"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env if present
dotenv_1.default.config();
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "cadastro_db",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};
const pool = promise_1.default.createPool(dbConfig);
pool
    .getConnection()
    .then((connection) => {
    console.log(`Conexão MySQL OK em ${dbConfig.host}:${dbConfig.port} como usuário ${dbConfig.user}`);
    connection.release();
})
    .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", (err === null || err === void 0 ? void 0 : err.message) || err);
    console.error("Verifique as variáveis de ambiente DB_HOST, DB_USER, DB_PASSWORD, DB_NAME e privilégios do usuário.");
    process.exit(1);
});
exports.default = pool;
