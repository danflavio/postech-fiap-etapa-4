# Postech FIAP - Etapa 4

> **Status:** Em desenvolvimento  
> **Curso:** Pós-Tech FIAP | **Etapa:** 4  
> **Autor:** [Dan Flavio](https://github.com/danflavio)

BlogFIAP — aplicação full-stack de leitura de blogs com **React Native (Expo)** no frontend mobile e **Node.js + Express + PostgreSQL** no backend.

---

## Tech Stack

**Mobile:** React Native 0.81 · Expo SDK 54 · TypeScript · Axios  
**Backend:** Node.js 20 · Express 5 · PostgreSQL 15 · Docker  
**Testes:** Jest 30 · Supertest 7  
**Infra:** Docker Compose · GitHub Actions

---

## Funcionalidades

- [x] Catálogo de posts com lista e busca
- [x] Detalhes do post (carregado via API)
- [x] Criação, edição e exclusão de posts (CRUD via API)
- [x] Busca por palavra-chave
- [ ] Autenticação
- [ ] Comentários

---

## Pré-requisitos

- Node.js v18+
- Docker (recomendado para o backend)
- Expo Go (dispositivo físico) ou emulador

---

## Execução

### Backend (Docker)

```bash
docker compose up -d
```

A API estará disponível em `http://localhost:3000`.

### Backend (sem Docker)

```bash
cd backend
cp ../.env.example .env  # edite as credenciais do banco
npm install
npm start
```

### Mobile

```bash
cd blog-mobile
cp .env.example .env
npm install
npx expo start
```

No terminal do Expo, pressione `a` (Android), `i` (iOS) ou `w` (Web).

---

## Estrutura do Projeto

```
postech-fiap-etapa-4/
├── backend/                  # API REST (Express + PostgreSQL)
│   ├── src/
│   │   ├── index.js          # Entry point
│   │   ├── config/db.js      # Conexão com PostgreSQL
│   │   ├── controllers/      # Lógica das rotas
│   │   └── routes/           # Definição de rotas
│   ├── tests/                # Testes de integração (Jest)
│   ├── init.sql              # Schema + seed data
│   └── Dockerfile
├── blog-mobile/              # App mobile (React Native / Expo)
│   ├── src/
│   │   ├── pages/            # Telas (Home, PostDetail)
│   │   ├── services/         # Axios client
│   │   ├── components/       # Componentes reutilizáveis
│   │   └── context/          # Contextos React
│   ├── components/           # Componentes de UI
│   ├── constants/            # Tema (cores, fontes)
│   └── hooks/                # Hooks personalizados
├── docker-compose.yml
└── .env.example
```

---

## API Endpoints

| Método | Rota                | Descrição              |
|--------|---------------------|------------------------|
| GET    | `/posts`            | Listar todos os posts  |
| GET    | `/posts/search?q=`  | Buscar posts           |
| GET    | `/posts/:id`        | Obter post por ID      |
| POST   | `/posts`            | Criar post             |
| PUT    | `/posts/:id`        | Atualizar post         |
| DELETE | `/posts/:id`        | Excluir post           |

---

## Scripts

### backend/

| Comando                | Descrição                   |
|------------------------|-----------------------------|
| `npm start`            | Inicia o servidor           |
| `npm test`             | Executa testes              |
| `npm run test:coverage`| Testes com cobertura        |

### blog-mobile/

| Comando              | Descrição                     |
|----------------------|-------------------------------|
| `npm start`          | Inicia o Expo dev server      |
| `npm run android`    | Inicia no Android             |
| `npm run ios`        | Inicia no iOS                 |
| `npm run web`        | Inicia no navegador           |
| `npm run lint`       | Executa o linter              |

---

## Licença

MIT
