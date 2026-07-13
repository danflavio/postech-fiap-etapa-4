# Postech FIAP - Etapa 4

> **Status:** Em desenvolvimento  
> **Curso:** Pós-Tech FIAP | **Etapa:** 4  
> **Autor:** [Dan Flavio](https://github.com/danflavio)

---

## Sobre o Projeto

<!-- Descreva aqui o objetivo do projeto, o problema que ele resolve e o contexto dentro da etapa 4 do curso PostTech FIAP. -->

Este repositório contém o projeto referente à **Etapa 4** da pós-graduação PostTech FIAP.  
O objetivo é desenvolver uma aplicação full-stack que aplique os conceitos aprendidos ao longo do curso, incluindo arquitetura de software, boas práticas de desenvolvimento, testes e deploy.

---

## Funcionalidades

<!-- Liste as principais funcionalidades da aplicação. -->

- [ ] Funcionalidade 1
- [ ] Funcionalidade 2
- [ ] Funcionalidade 3

---

## Tech Stack

<!-- Preencha com as tecnologias utilizadas no projeto. -->

**Backend:**
- Linguagem: `--`
- Framework: `--`
- Banco de Dados: `--`
- ORM: `--`

**Frontend:**
- Framework: `--`
- Estilização: `--`

**Infraestrutura:**
- Containerização: Docker
- Cloud/Deploy: `--`

**Ferramentas:**
- Versionamento: Git & GitHub
- CI/CD: `--`

---

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (opcional, mas recomendado)
- Gerenciador de pacotes: `npm`, `yarn` ou `pnpm`

---

## Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/danflavio/postech-fiap-etapa-4.git

# Acesse a pasta do projeto
cd postech-fiap-etapa-4

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie a aplicação
npm run dev
```

Com Docker:

```bash
docker compose up -d
```

---

## Estrutura do Projeto

<!-- Atualize conforme a estrutura real do projeto. -->

```
├── src/              # Código-fonte
│   ├── controllers/  # Controladores
│   ├── models/       # Modelos/DTOs
│   ├── routes/       # Rotas
│   ├── services/     # Lógica de negócio
│   └── shared/       # Utilitários e tipos comuns
├── tests/            # Testes automatizados
├── docker/           # Arquivos de configuração Docker
├── .env.example      # Exemplo de variáveis de ambiente
└── docker-compose.yml
```

---

## Variáveis de Ambiente

```env
# Aplicação
PORT=3000
NODE_ENV=development

# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Autenticação
JWT_SECRET=your-secret-key
```

> Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

---

## Scripts Disponíveis

| Comando         | Descrição                    |
|-----------------|------------------------------|
| `npm run dev`   | Inicia o servidor em dev     |
| `npm run build` | Compila o projeto            |
| `npm start`     | Inicia em produção           |
| `npm test`      | Executa os testes            |
| `npm run lint`  | Executa o linter             |

---

## Testes

```bash
# Executa todos os testes
npm test

# Executa testes com cobertura
npm run test:coverage
```

---

## Deploy

<!-- Descreva o processo de deploy, se aplicável. -->

Instruções de deploy serão definidas conforme o avanço do projeto.

---

## Contribuição

Este é um projeto acadêmico. Contribuições não são esperadas, mas sugestões são bem-vindas via [issues](https://github.com/danflavio/postech-fiap-etapa-4/issues).

---

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
