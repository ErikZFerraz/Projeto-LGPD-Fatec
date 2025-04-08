require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Importando o modelo User

// 1. Exportação de Dados (Portabilidade)
router.get('/exportar_dados/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        // Exportar dados do usuário em formato JSON
        const dadosUsuario = {
            nome: user.nome,
            email: user.email,
            data_cadastro: user.data_cadastro
        };
        res.json(dadosUsuario);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao exportar dados" });
    }
});

// 2. Opt-in / Opt-out (Consentimento)
router.post('/optin/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const { aceitouMarketing } = req.body;  // Espera-se um campo de consentimento

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        // Atualiza a preferência de marketing
        user.aceitou_marketing = aceitouMarketing;
        await user.save();

        res.json({ mensagem: "Consentimento atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar consentimento" });
    }
});

// 3. Exclusão de Dados (Direito ao Esquecimento)
router.delete('/excluir_usuario/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        // Exclui os dados do usuário
        await user.destroy();

        res.json({ mensagem: "Conta excluída com sucesso." });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao excluir conta" });
    }
});

module.exports = router;
