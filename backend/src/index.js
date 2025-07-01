const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const termosRoutes = require("./routes/terms");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // substitua pela URL do seu front
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: "segredo-super-seguro", // coloque segredo forte em produção
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true se for HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 dia
  }
}));

// Rotas
app.use(authRoutes);
app.use(termosRoutes);

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
