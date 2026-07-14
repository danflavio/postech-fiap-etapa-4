CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS professores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO posts (title, content, author)
VALUES ('Boas-vindas 2026', 'Sejam todos bem-vindos ao novo semestre letivo. Preparem seus materiais e sua curiosidade!', 'Diretora Maria');

INSERT INTO posts (title, content, author)
VALUES ('Desafio Node.js e Docker', 'Nesta semana, exploraremos como containerizar aplicações e garantir a persistência com volumes.', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('Introdução ao PostgreSQL', 'Hoje aprenderemos a diferença entre bancos relacionais e não-relacionais, com foco em SQL.', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('Vencendo o Medo de Falar', 'A técnica do silêncio estratégico pode mudar a forma como você se comunica em apresentações.', 'Coordenadora Ana');

INSERT INTO posts (title, content, author)
VALUES ('Lógica de Programação ADVPL', 'Entenda como estruturar funções de usuário e manipular tabelas no ambiente Protheus.', 'Analista Daniel');

INSERT INTO posts (title, content, author)
VALUES ('Reunião de Pais - Unidade Anápolis', 'Convocamos todos os responsáveis para a reunião sobre o desempenho escolar no dia 10/04.', 'Secretaria Escolar');

INSERT INTO posts (title, content, author)
VALUES ('Finanças Pessoais 101', 'A importância de criar uma reserva de emergência e como iniciar seus primeiros investimentos.', 'Prof. de Economia');

INSERT INTO posts (title, content, author)
VALUES ('Diferença entre Onde e Aonde', 'Lembre-se: Onde indica lugar fixo, enquanto Aonde indica movimento e destino.', 'Profa. Letícia');

INSERT INTO posts (title, content, author)
VALUES ('English for Developers', 'Termos essenciais como Build, Deploy e Code Review aplicados ao dia a dia da TI.', 'Prof. James');

INSERT INTO posts (title, content, author)
VALUES ('Impactos da Reforma nos ERPs', 'Como as novas regras tributárias brasileiras afetarão os cálculos automáticos nos sistemas.', 'Supervisora Tributária');

INSERT INTO professores (nome, email)
VALUES
  ('Prof. Daniel Flavio', 'daniel.flavio@escola.com'),
  ('Profa. Letícia', 'leticia@escola.com'),
  ('Prof. James', 'james@escola.com');

INSERT INTO alunos (nome, email)
VALUES
  ('João Silva', 'joao.silva@aluno.com'),
  ('Maria Santos', 'maria.santos@aluno.com'),
  ('Pedro Oliveira', 'pedro.oliveira@aluno.com');
