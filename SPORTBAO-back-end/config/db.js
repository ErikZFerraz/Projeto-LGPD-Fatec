const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: 'fatec', // Substitua pela sua senha do MySQL
  database: 'LGPD' // Substitua pelo nome do seu banco
});

// Conexão com o banco utilizando Promises para integração com async/await
const connectDB = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
        return reject(err);
      }
      console.log('Banco de dados conectado!');
      resolve(db);
    });
  });
};

// Exportando a função para conectar ao banco e o próprio objeto db
module.exports = { connectDB, db };
