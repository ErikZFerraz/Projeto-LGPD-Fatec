# 🏋️‍♂️ FitZone – Loja de Produtos Fitness

Sistema Full Stack para venda de suplementos, vestuário e acessórios esportivos. A plataforma oferece uma experiência completa de compra para o cliente e gerenciamento eficiente para os administradores, com foco em usabilidade, segurança e respeito à privacidade do usuário.

## 💡 Descrição

Este projeto foi desenvolvido com o objetivo de criar uma loja virtual responsiva, moderna e conectada às boas práticas da LGPD. O sistema permite aos usuários navegar por produtos como creatina, camisetas, acessórios esportivos, e muito mais — com controle de conta, termos de uso e preferências de marketing.

### O sistema possui:

- 🛍️ Vitrine com produtos fitness.
- ✅ Cadastro e login de usuários com autenticação.
- 🔐 Funcionalidades de privacidade como OPT-IN/OPT-OUT, transparência de dados e exclusão da conta.
- 👨‍💼 Painel administrativo com controle de termos.
- 📁 Gerenciamento dos termos de uso e das configurações de LGPD.

---

## 🔥 Funcionalidades

### Para o usuário:

- 👤 Cadastro, login e autenticação segura.
- 🧃 Visualização de produtos: creatina, camisetas, acessórios e mais.
- ✅ Aceite de termos de uso e configurações de privacidade:
  - **OPT-IN/OPT-OUT**: escolher receber ou não promoções e novidades.
  - **Transparência**: página explicando os dados coletados e suas finalidades.
  - **Exclusão**: botão para deletar conta e dados pessoais.

---

## 🧠 Tecnologias Utilizadas

### 🔙 Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- CORS
- Dotenv
- JWT (Autenticação)

### 🔥 Frontend (Web)
- React com Vite
- React Router DOM
- Context API
- Tailwind CSS / CSS Modules
- React Icons

### 🗄️ Banco de Dados
- PostgreSQL

---

## 🚀 Como rodar o projeto

### Backend

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```env
   DATABASE_URL=postgres://usuario:senha@localhost:5432/fitzone
   PORT=3000
   JWT_SECRET=sua_chave_secreta
   ```

4. Rode as migrações (se aplicável):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

### Frontend

1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173
   ```

---

## 📁 Estrutura do Projeto

```bash
FitZone/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   ├── .env
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── ...
└── README.md
```

---

## 🎨 Demonstração

### Em breve...

---

## 🛠️ Melhorias Futuras

- Integração com gateways de pagamento (Pix, cartão, etc).
- Histórico de pedidos do usuário.
- Avaliações e comentários em produtos.
- Cupons de desconto.
- Upload de imagens para novos produtos (admin).
- Testes automatizados (unitários e e2e).

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
