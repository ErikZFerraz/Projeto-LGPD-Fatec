CREATE DATABASE LGPD;

USE LGPD;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    aceitou_marketing BOOLEAN DEFAULT FALSE, -- Consentimento de marketing (Opt-in)
    status VARCHAR(20) DEFAULT 'ativo' -- Status de conta (ativo/inativo/excluído)
);

-- Exemplo de dados de um usuário
INSERT INTO usuarios (nome, email, aceitou_marketing)
VALUES ('João Silva', 'joao@exemplo.com', TRUE);
