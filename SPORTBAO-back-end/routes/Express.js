require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const lgpdRoutes = require('./routes/lgpdRoutes'); // Nova rota para LGPD

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/lgpd', lgpdRoutes); // Rota para a LGPD
app.use('/api/auth', authRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
