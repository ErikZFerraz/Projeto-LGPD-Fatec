const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const authMiddleware = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Cadastro
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, aceite, receberEmails, compartilharGenero } = req.body;

    const emailExistente = await pool.query(`SELECT 1 FROM usuarios WHERE email = $1`, [email]);
    if (emailExistente.rowCount > 0) {
      return res.status(409).json({ message: "Email já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, aceite, receber_emails, compartilhar_genero)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [nome, email, senhaHash, aceite, receberEmails, compartilharGenero]
    );
    const userId = result.rows[0].id;

    const termoQuery = await pool.query(
      `SELECT id FROM termos
       WHERE titulo ILIKE 'Termos de Uso - Cadastro' AND obrigatorio = true
       ORDER BY data_criacao DESC LIMIT 1`
    );

    if (termoQuery.rowCount > 0) {
      const termoId = termoQuery.rows[0].id;

      await pool.query(
        `INSERT INTO usuario_termos (usuario_id, termo_id, status, data_resposta)
         VALUES ($1, $2, 'Aceito', NOW())`,
        [userId, termoId]
      );
    }

    res.status(201).json({ message: "Usuário registrado com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const user = result.rows[0];

    const senhaCorreta = await bcrypt.compare(password, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    req.session.userId = user.id;
    req.session.isAdmin = user.is_admin;

    return res.json({
      sucesso: true,
      email: user.email,
      is_admin: user.is_admin,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao fazer login." });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ sucesso: true });
  });
});

// Perfil (GET)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT nome, email, is_admin, receber_emails, compartilhar_genero
       FROM usuarios WHERE id = $1`,
      [req.session.userId]
    );

    const user = result.rows[0];

    return res.json({
      nome: user.nome,
      email: user.email,
      is_admin: user.is_admin,
      receberEmails: user.receber_emails,
      compartilharGenero: user.compartilhar_genero,
    });
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    return res.status(500).json({ error: "Erro ao buscar perfil." });
  }
});

// Atualizar perfil (PUT)
router.put("/usuario", authMiddleware, async (req, res) => {
  const { nome, email, senhaAtual, novaSenha, receberEmails, compartilharGenero } = req.body;
  const usuarioId = req.session.userId;

  if (!nome || !email) {
    return res.status(400).send("Nome e email são obrigatórios");
  }

  try {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [usuarioId]);
    const user = rows[0];
    if (!user) return res.status(404).send("Usuário não encontrado");

    if (novaSenha) {
      const senhaCorreta = await bcrypt.compare(senhaAtual || "", user.senha);
      if (!senhaCorreta) return res.status(403).send("Senha atual incorreta");

      const hashNovaSenha = await bcrypt.hash(novaSenha, 10);
      await pool.query(
        `UPDATE usuarios
         SET nome = $1, email = $2, senha = $3,
             receber_emails = $4, compartilhar_genero = $5
         WHERE id = $6`,
        [nome, email, hashNovaSenha, receberEmails, compartilharGenero, usuarioId]
      );
    } else {
      await pool.query(
        `UPDATE usuarios
         SET nome = $1, email = $2,
             receber_emails = $3, compartilhar_genero = $4
         WHERE id = $5`,
        [nome, email, receberEmails, compartilharGenero, usuarioId]
      );
    }

    res.sendStatus(204);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).send("Erro no servidor");
  }
});

// Excluir conta (DELETE)
router.delete("/usuario", authMiddleware, async (req, res) => {
  const userId = req.session.userId;

  try {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [userId]);
    const user = rows[0];
    if (!user) return res.status(404).send("Usuário não encontrado");

    const idExclusao = uuidv4();

    await pool.query(
      `UPDATE usuarios
       SET nome = 'Excluído',
           email = CONCAT('excluido_', id, '@anonimo.com'),
           senha = '',
           aceite = false,
           receber_emails = false,
           compartilhar_genero = false,
           excluido = true,
           data_exclusao = NOW(),
           id_exclusao = $1
       WHERE id = $2`,
      [idExclusao, userId]
    );

    await pool.query("DELETE FROM usuario_termos WHERE usuario_id = $1", [userId]);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ sucesso: true, id_exclusao: idExclusao });
    });
  } catch (err) {
    console.error("Erro ao excluir usuário:", err);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
