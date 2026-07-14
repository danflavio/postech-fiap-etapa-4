# Postech FIAP - Etapa 4 · Blog Acadêmico

> **Curso:** Pós-Tech em Arquitetura de Software · FIAP

Aplicação full-stack de blog com **React Native (Expo)** no frontend mobile/web e **Node.js + Express + PostgreSQL** no backend, com autenticação JWT e CRUD completo.

---

## Funcionalidades

- Catálogo de posts com busca por palavra-chave
- Leitura de posts com conteúdo completo
- Painel administrativo com autenticação JWT (login real via API)
- CRUD completo de posts (criar, editar, excluir — apenas autenticados)
- Gestão de professores e estudantes (cadastro, edição, exclusão)
- Proteção de rotas: visitante só lê, professor logado gerencia tudo
- Interface responsiva (Android, iOS e web)

---

## Pré-requisitos

| Ferramenta | Versão |
|---|---|
| [Docker](https://www.docker.com) | 24+ **(recomendado)** |
| [Node.js](https://nodejs.org) | 18+ (caso rode sem Docker) |
| [Expo Go](https://expo.dev/go) | — (app no celular) |

---

## Início rápido (Docker — recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/danflavio/postech-fiap-etapa-4.git
cd postech-fiap-etapa-4

# 2. Suba backend + banco de dados
docker compose up -d

# 3. Verifique se está no ar
curl http://localhost:3010/

# Deve responder:
# API do Tech Challenge da FIAP - Etapa 4 rodando com variáveis de ambiente
```

Pronto. O backend está em `http://localhost:3010`.

---

## Rodando o app mobile (Expo)

```bash
cd blog-mobile
npm install
cp .env.example .env
```

### Configure o `.env` do mobile

| Cenário | Configuração |
|---|---|
| **Emulador Android** | Não mexa em nada — o app detecta `10.0.2.2` automaticamente |
| **Navegador (web)** | Não mexa em nada — o app usa `localhost` |
| **Celular físico (Expo Go)** | Descubra o IP do seu computador e coloque no `.env`: |

```
EXPO_PUBLIC_API_HOST=http://192.168.1.100
EXPO_PUBLIC_API_PORT=3010
```

> **Como descobrir seu IP:** Windows → `ipconfig` · Mac/Linux → `ifconfig` ou `ip addr`

```bash
# Inicie o Expo
npx expo start
```

Pressione `a` (Android), `i` (iOS) ou `w` (web) no terminal do Expo.

---

## Rodando sem Docker (desenvolvimento local)

### Backend

```bash
cd backend
cp .env.example .env   # ajuste as credenciais do banco se necessário
npm install
npm start              # inicia em http://localhost:3010
```

### Banco de dados

Você precisa de um PostgreSQL rodando localmente com:

| Configuração | Valor |
|---|---|
| Host | `localhost` |
| Porta | `5432` |
| Usuário | `user` |
| Senha | `password` |
| Database | `blogging_db` |

> O backend cria as tabelas automaticamente ao iniciar. Nada de SQL manual.

---

## Primeiro acesso (login)

Na primeira execução, o backend cria automaticamente um professor administrador:

| Campo | Valor |
|---|---|
| **E-mail** | `admin@fiap.com.br` |
| **Senha** | `admin123` |

**Fluxo:**
1. Na Home, toque em **"Login do Professor"**
2. Informe `admin@fiap.com.br` e `admin123`
3. Pronto — você está no **Painel Administrativo**
4. De lá pode criar novos professores (com senha), alunos e gerenciar posts

> Para sair, toque em **"Sair"** no canto superior direito do painel.

---

## API Endpoints

### Autenticação (público)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/login` | Autentica e retorna token JWT |

**Exemplo:**
```json
// Request
{ "email": "admin@fiap.com.br", "senha": "admin123" }

// Response
{ "token": "eyJ...", "professor": { "id": 1, "nome": "Administrador", "email": "admin@fiap.com.br" } }
```

### Posts (GET é público; POST/PUT/DELETE precisam de token)

| Método | Rota | Descrição | Token |
|---|---|---|---|
| `GET` | `/posts` | Listar todos | ❌ |
| `GET` | `/posts/search?q=` | Buscar por termo | ❌ |
| `GET` | `/posts/:id` | Detalhes do post | ❌ |
| `POST` | `/posts` | Criar post | ✅ |
| `PUT` | `/posts/:id` | Atualizar post | ✅ |
| `DELETE` | `/posts/:id` | Excluir post | ✅ |

### Professores (todas precisam de token)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/professores` | Listar todos |
| `GET` | `/professores/:id` | Buscar por ID |
| `POST` | `/professores` | Cadastrar (com `senha`) |
| `PUT` | `/professores/:id` | Atualizar |
| `DELETE` | `/professores/:id` | Excluir |

### Alunos (todas precisam de token)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/alunos` | Listar todos |
| `GET` | `/alunos/:id` | Buscar por ID |
| `POST` | `/alunos` | Cadastrar |
| `PUT` | `/alunos/:id` | Atualizar |
| `DELETE` | `/alunos/:id` | Excluir |

> Para chamar endpoints protegidos, envie o token no header:
> `Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`

---

## Estrutura do Projeto

```
postech-fiap-etapa-4/
├── backend/                          # API REST (Express + PostgreSQL)
│   ├── src/
│   │   ├── index.js                  # Entry point + montagem das rotas
│   │   ├── config/db.js              # Pool PostgreSQL + criação de tabelas + seed admin
│   │   ├── middleware/auth.js         # Verificação de token JWT
│   │   ├── controllers/postsController.js
│   │   └── routes/
│   │       ├── auth.js               # POST /auth/login
│   │       ├── posts.js              # CRUD de posts (GET público, mutação protegida)
│   │       ├── professores.js        # CRUD professores (protegido, senha hasheada)
│   │       └── alunos.js             # CRUD alunos (protegido)
│   ├── sql/init.sql                  # Schema + seed (executado só na 1ª vez do Docker)
│   ├── tests/                        # Jest + Supertest
│   ├── .env.example
│   └── Dockerfile
├── blog-mobile/                      # App React Native / Expo
│   ├── src/
│   │   ├── pages/                    # 12 telas (Home, Login, Admin, CRUDs, etc.)
│   │   ├── context/AuthContext.js    # Estado global de autenticação + token JWT
│   │   ├── services/api.js           # Axios com detecção de host + headers automáticos
│   │   └── components/               # Componentes reutilizáveis
│   ├── App.js                        # Navegação condicional (público x protegido)
│   └── .env.example
├── docker-compose.yml                # Backend + PostgreSQL
└── .env.example
```

---

## Scripts

### Backend (`backend/`)

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor |
| `npm test` | Executa os testes |
| `npm run test:coverage` | Testes com relatório de cobertura |

### Mobile (`blog-mobile/`)

| Comando | Descrição |
|---|---|
| `npx expo start` | Inicia o dev server do Expo |
| `npx expo start --android` | Abre direto no Android |
| `npx expo start --ios` | Abre direto no iOS |
| `npx expo start --web` | Abre no navegador |
| `npm run lint` | Executa o linter |

---

## Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| **"Network Error" no celular** | IP incorreto no `.env` do mobile | Configure `EXPO_PUBLIC_API_HOST` com o IP da máquina. Celular e PC precisam estar na **mesma rede Wi-Fi** |
| **"Token não fornecido"** | Tentou criar/editar sem login | Faça login primeiro (Home → "Login do Professor") |
| **"E-mail ou senha inválidos"** | Credenciais erradas | Use `admin@fiap.com.br` / `admin123`. Se já mudou, verifique com outro admin |
| **"500 Internal Server Error"** | Banco offline ou credenciais erradas | Verifique se o PostgreSQL está rodando e confira `backend/.env` |
| **Tabela não encontrada** | Banco foi criado antes das tabelas | O backend cria as tabelas automaticamente. Se persistir: `docker compose down -v && docker compose up -d` |
| **Tela em branco** | Metrobundler travado | `npx expo start --clear` |

---

## Licença

MIT
