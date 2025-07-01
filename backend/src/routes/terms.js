const express = require("express");
const pool = require("../db");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /termos — lista todos termos (admin) ou apenas os que o usuário ainda não respondeu
router.get("/termos", async (req, res) => {
  if (!req.session.userId) return res.status(401).send("Não autorizado");

  const usuarioId = req.session.userId;
  const adminQuery = req.session.isAdmin;
  try {
    if (adminQuery) {
      const { rows } = await pool.query("SELECT * FROM termos ORDER BY data_criacao DESC");
      return res.json(rows);
    }

    // para usuários, traz termos + status se respondidos
    const { rows } = await pool.query(`
      SELECT t.*, ut.status, ut.data_resposta
      FROM termos t
      LEFT JOIN usuario_termos ut
        ON ut.termo_id = t.id AND ut.usuario_id = $1
      ORDER BY t.data_criacao DESC
    `, [usuarioId]);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao obter termos");
  }
});

// POST /termos — criar termo (admin)
router.post("/termos", isAdmin, async (req, res) => {
  const { titulo, versao, conteudo, obrigatorio } = req.body;
  if (!titulo || !versao || !conteudo) return res.status(400).send("Faltam dados");

  try {
    const { rows } = await pool.query(
      `INSERT INTO termos (titulo, versao, conteudo, obrigatorio)
       VALUES ($1,$2,$3,$4) RETURNING *`,
       [titulo, versao, conteudo, obrigatorio]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar termo");
  }
});

// PUT /termos/:id — editar termo (admin)
// PUT /termos/:id — editar termo (admin)
router.put("/termos/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { titulo, versao, conteudo, obrigatorio } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Atualiza o termo
    const { rows } = await client.query(
      `UPDATE termos
         SET titulo=$1, versao=$2, conteudo=$3, obrigatorio=$4, data_criacao=NOW()
       WHERE id=$5 RETURNING *`,
      [titulo, versao, conteudo, obrigatorio, id]
    );

    // 2. Remove os aceites/recusas anteriores dos usuários
    await client.query(
      `DELETE FROM usuario_termos WHERE termo_id = $1`,
      [id]
    );

    await client.query("COMMIT");

    return res.json(rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).send("Erro ao editar termo");
  } finally {
    client.release();
  }
});

// DELETE /termos/:id — excluir termo (admin)
router.delete("/termos/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM termos WHERE id=$1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir termo");
  }
});

// POST /termos/:id/responder — usuário responde um termo
router.post("/termos/:id/responder", async (req, res) => {
  if (!req.session.userId) return res.status(401).send("Não autorizado");

  const usuarioId = req.session.userId;
  const termoId = req.params.id;
  const { status } = req.body;

  if (!["Aceito", "Recusado"].includes(status)) {
    return res.status(400).send("Status inválido");
  }

  try {
    const exists = await pool.query(
      `SELECT * FROM usuario_termos WHERE usuario_id = $1 AND termo_id = $2`,
      [usuarioId, termoId]
    );

    if (exists.rows.length === 0) {
      await pool.query(
        `INSERT INTO usuario_termos (usuario_id, termo_id, status, data_resposta)
         VALUES ($1, $2, $3, NOW())`,
        [usuarioId, termoId, status]
      );
    } else {
      await pool.query(
        `UPDATE usuario_termos
         SET status = $3, data_resposta = NOW()
         WHERE usuario_id = $1 AND termo_id = $2`,
        [usuarioId, termoId, status]
      );
    }

    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao responder termo");
  }
});


module.exports = router;
