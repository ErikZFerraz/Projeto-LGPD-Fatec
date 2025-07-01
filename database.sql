CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  aceite BOOLEAN DEFAULT false,
  receber_emails BOOLEAN DEFAULT false,
  compartilhar_genero BOOLEAN DEFAULT false,
	excluido BOOLEAN DEFAULT FALSE,
	data_exclusao TIMESTAMP,
	id_exclusao UUID
);

CREATE TABLE termos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  versao VARCHAR(50) NOT NULL,
  conteudo TEXT NOT NULL,
  obrigatorio BOOLEAN NOT NULL DEFAULT false,
  data_criacao TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE usuario_termos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  termo_id INTEGER REFERENCES termos(id) ON DELETE CASCADE,
  status VARCHAR(10) NOT NULL CHECK (status IN ('Aceito','Recusado')),
  data_resposta TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(usuario_id, termo_id)
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios (
  nome,
  email,
  senha,
  aceite,
  receber_emails,
  compartilhar_genero,
  is_admin
) VALUES (
  'Admin Teste',
  'admin@email.com',
  crypt('123', gen_salt('bf')),
  true,
  false,
  false,
  true
);

INSERT INTO termos (titulo, versao, conteudo, obrigatorio)
VALUES ('Termos de Uso - Cadastro', 'v1.0', 'Texto do termo de uso...', true);

ALTER TABLE usuarios
ADD COLUMN excluido BOOLEAN DEFAULT false,
ADD COLUMN data_exclusao TIMESTAMP,
ADD COLUMN id_exclusao UUID;


select * from usuarios;
select * from termos;
SELECT * FROM usuarios WHERE excluido = true;
select * from usuario_termos;
