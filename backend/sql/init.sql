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
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- POSTS
INSERT INTO posts (title, content, author)
VALUES ('Boas-vindas ao Tech Challenge FIAP 2026', 'Sejam todos bem-vindos à Etapa 4 do Tech Challenge da Pós-Tech em Arquitetura de Software. Preparem-se para containerização, APIs REST e deploy!', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('Node.js com Express: Construindo APIs REST', 'Nesta aula vimos como estruturar uma API com Express, organizando rotas, controllers e config de banco com boas práticas de separação de responsabilidades.', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('Docker na Prática: Containerização de Aplicações', 'Exploramos Dockerfile, docker-compose, redes bridge e volumes. Aplicação Node.js + PostgreSQL rodando em containers com healthcheck e variáveis de ambiente.', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('PostgreSQL: Modelagem e Consultas Avançadas', 'Aprendemos a diferença entre bancos relacionais e não-relacionais. Criamos tabelas com chaves estrangeiras, índices e consultas com JOINs e subqueries.', 'Prof. Washington Barsotti');

INSERT INTO posts (title, content, author)
VALUES ('React Native com Expo: Do Zero ao App', 'Configuramos um projeto Expo, entendemos navegação com React Navigation e conectamos o app mobile à API REST do backend. Testado no Expo Go e web.', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('Arquitetura de Microsserviços na Prática', 'Desmembramos um monolito em serviços independentes, discutindo service discovery, API Gateway e comunicação assíncrona com filas de mensageria.', 'Prof. Washington Barsotti');

INSERT INTO posts (title, content, author)
VALUES ('Testes Automatizados com Jest e Supertest', 'Escrevemos testes unitários e de integração para APIs Node.js. Cobertura de rotas GET, POST, PUT e DELETE com validação de respostas e status codes.', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('CI/CD com GitHub Actions', 'Pipeline de integração e deploy contínuo: lint, testes automatizados, build de imagem Docker e deploy em ambiente de staging com aprovação manual.', 'Prof. Washington Barsotti');

INSERT INTO posts (title, content, author)
VALUES ('Clean Code e Princípios SOLID', 'Refatoramos um módulo legado aplicando Single Responsibility, Open/Closed e Dependency Inversion. Código mais testável, desacoplado e legível.', 'Prof. Washington Barsotti');

INSERT INTO posts (title, content, author)
VALUES ('Segurança em APIs REST: JWT e OAuth2', 'Implementamos autenticação e autorização com JSON Web Tokens. Refresh tokens, roles de acesso e boas práticas contra CSRF e XSS.', 'Prof. Washington Barsotti');

INSERT INTO posts (title, content, author)
VALUES ('Design Patterns em Node.js', 'Singleton para conexão com banco, Factory para criação de objetos complexos e Observer aplicado em eventos de log e notificações.', 'Prof. Daniel Flavio');

INSERT INTO posts (title, content, author)
VALUES ('Deploy em Nuvem: AWS e Railway', 'Publicamos a aplicação completa em ambiente cloud. Configuração de variáveis de ambiente, secrets, domínio customizado e monitoramento básico.', 'Prof. Washington Barsotti');

-- PROFESSORES
INSERT INTO professores (nome, email)
VALUES
  ('Prof. Daniel Flavio', 'daniel.flavio@fiap.com.br'),
  ('Prof. Washington Barsotti', 'washington.barsotti@fiap.com.br');

-- ALUNOS
INSERT INTO alunos (nome, email)
VALUES
  ('Ana Beatriz Costa', 'ana.costa@aluno.fiap.com.br'),
  ('Carlos Eduardo Lima', 'carlos.lima@aluno.fiap.com.br'),
  ('Fernanda Oliveira', 'fernanda.oliveira@aluno.fiap.com.br'),
  ('Gabriel Santos', 'gabriel.santos@aluno.fiap.com.br'),
  ('Juliana Martins', 'juliana.martins@aluno.fiap.com.br'),
  ('Lucas Almeida', 'lucas.almeida@aluno.fiap.com.br'),
  ('Mariana Ribeiro', 'mariana.ribeiro@aluno.fiap.com.br'),
  ('Rafael Pereira', 'rafael.pereira@aluno.fiap.com.br');
