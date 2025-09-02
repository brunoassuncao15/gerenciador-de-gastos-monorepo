import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root", // Altere para o seu usuário do MySQL
  password: "sua_senha", // Altere para a sua senha
  database: "cadastro_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

pool
  .getConnection()
  .then((connection) => {
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso!");
    connection.release();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    process.exit(1);
  });

export default pool;
