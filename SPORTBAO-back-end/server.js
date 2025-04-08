require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./db');  // Importando a função de conexão

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados quando o servidor iniciar
connectDB()
  .then(() => {
    // O banco está conectado, podemos rodar a aplicação
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    // Iniciar o servidor Express
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
