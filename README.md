# Postech FIAP - Etapa 4 · Blog Acadêmico

> **Curso:** Pós-Tech em Arquitetura de Software · FIAP  
> **Autor:** [Dan Flavio](https://github.com/danflavio)

Aplicação full-stack de blog com **React Native (Expo)** no frontend mobile/web e **Node.js + Express + PostgreSQL** no backend, orquestrados com Docker Compose.

---

## Funcionalidades

- Catálogo de posts com busca por palavra-chave
- Detalhes do post carregados via API
- CRUD completo de posts (criar, editar, excluir)
- Painel administrativo com autenticação simulada (usuário/senha)
- Gestão de professores e estudantes (cadastro, edição, exclusão)
- Interface responsiva (mobile Android, iOS e web)

---

## Pré-requisitos

| Ferramenta | Versão mínima | Para quê |
|---|---|---|
| [Node.js](https://nodejs.org) | 18+ | Backend + mobile |
| [Docker](https://www.docker.com) | 24+ | Executar backend + banco |
| [Expo Go](https://expo.dev/go) | — | Rodar app no celular |

> No Windows, recomendamos usar o **PowerShell** ou **Git Bash**.

---

## Início rápido (Docker)

```bash
# 1. Clone o repositório
git clone https://github.com/danflavio/postech-fiap-etapa-4.git
cd postech-fiap-etapa-4

# 2. Suba o backend + banco de dados
docker compose up -d

# 3. Verifique se está rodando
curl http://localhost:3010/
# Deve retornar: API do Tech Challenge da FIAP - Etapa 4 rodando...
```

O backend estará em `http://localhost:3010` e o PostgreSQL em `localhost:5432`.

---

## Rodando o mobile (Expo)

```bash
cd blog-mobile
npm install

# Copie o .env de exemplo
cp .env.example .env
```

### Configure o `.env` do mobile

```bash
# Emulador Android (padrão — já funciona out of the box)
# NÃO defina EXPO_PUBLIC_API_HOST — o app detecta automaticamente

# Dispositivo físico (Android/iOS via Expo Go)
# Defina o IP local da máquina que roda o backend:
EXPO_PUBLIC_API_HOST=http://192.168.1.113

# Porta (padrão 3010)
EXPO_PUBLIC_API_PORT=3010
```

> **Como descobrir seu IP:** Windows → `ipconfig` · Mac/Linux → `ifconfig` ou `ip addr`

```bash
# Inicie o Expo
npx expo start
```

Pressione `w` (web), `a` (Android) ou `i` (iOS) no terminal do Expo.

---

## Rodando sem Docker (desenvolvimento local)

### Backend

```bash
cd backend
cp .env.example .env   # Ajuste as credenciais do banco
npm install
npm start              # Inicia na porta 3010
```

### Banco de dados

Você precisa de um PostgreSQL rodando localmente com:

- Host: `localhost`
- Porta: `5432`
- Usuário: `user`
- Senha: `password`
- Database: `blogging_db`

O backend cria as tabelas automaticamente na inicialização.

---

## Autenticação (Admin)

| Campo | Valor |
|---|---|
| Usuário | `professor` |
| Senha | `123456` |

Acesse pela Home → "Login do Professor" ou direto no Expo Go.

---

## API Endpoints

### Posts

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/posts` | Listar todos |
| `GET` | `/posts/search?q=` | Buscar por termo |
| `GET` | `/posts/:id` | Detalhes do post |
| `POST` | `/posts` | Criar post |
| `PUT` | `/posts/:id` | Atualizar post |
| `DELETE` | `/posts/:id` | Excluir post |

### Professores

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/professores` | Listar todos |
| `POST` | `/professores` | Cadastrar |
| `PUT` | `/professores/:id` | Atualizar |
| `DELETE` | `/professores/:id` | Excluir |

### Alunos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/alunos` | Listar todos |
| `POST` | `/alunos` | Cadastrar |
| `PUT` | `/alunos/:id` | Atualizar |
| `DELETE` | `/alunos/:id` | Excluir |

---

## Estrutura do Projeto

```
postech-fiap-etapa-4/
├── backend/
│   ├── src/
│   │   ├── index.js              # Entry point do servidor
│   │   ├── config/db.js          # Pool PostgreSQL + criação automática de tabelas
│   │   ├── controllers/          # Lógica de negócio (posts)
│   │   └── routes/               # Rotas (posts, professores, alunos)
│   ├── sql/
│   │   └── init.sql              # Schema + seed data (Docker)
│   ├── tests/                    # Jest + Supertest
│   ├── .env.example
│   └── Dockerfile
├── blog-mobile/
│   ├── src/
│   │   ├── pages/                # 11 telas (Home, Admin, CRUD, Login, etc.)
│   │   ├── services/api.js       # Axios com detecção automática de host
│   │   ├── components/           # Componentes reutilizáveis
│   │   └── routes/               # Definição de rotas
│   ├── App.js                    # Navegação (React Navigation)
│   └── .env.example
├── docker-compose.yml            # Backend + PostgreSQL
└── .env.example                  # Variáveis globais
```

---

## Scripts

### `backend/`

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor |
| `npm test` | Executa os testes |
| `npm run test:coverage` | Testes com relatório de cobertura |

### `blog-mobile/`

| Comando | Descrição |
|---|---|
| `npx expo start` | Inicia o dev server |
| `npx expo start --android` | Abre direto no Android |
| `npx expo start --ios` | Abre direto no iOS |
| `npx expo start --web` | Abre no navegador |
| `npm run lint` | Executa o linter |

---

## Troubleshooting

| Problema | Solução |
|---|---|
| **"Network Error" no celular** | Configure `EXPO_PUBLIC_API_HOST` com o IP local da máquina. Celular e PC precisam estar na mesma rede Wi-Fi. |
| **"500 Internal Server Error"** | Verifique se o PostgreSQL está rodando e as credenciais em `backend/.env` estão corretas. |
| **Botão não arredondado** | Reinicie o Metro bundler (`npx expo start --clear`). |
| **Tabela não encontrada** | O backend cria as tabelas automaticamente. Se o erro persistir, recrie o volume: `docker compose down -v && docker compose up -d`. |

---

## Licença

MIT
