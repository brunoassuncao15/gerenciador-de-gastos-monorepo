import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Bruno@15",
  database: "banco_gerenciador",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
} as const;

const pool = mysql.createPool(dbConfig);

pool
  .getConnection()
  .then((connection) => {
    console.log(
      `Conexão MySQL OK em ${dbConfig.host}:${dbConfig.port} como usuário ${dbConfig.user}`
    );
    connection.release();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err?.message || err);
    console.error(
      "Verifique as variáveis de ambiente DB_HOST, DB_USER, DB_PASSWORD, DB_NAME e privilégios do usuário."
    );
    process.exit(1);
  });

export default pool;
