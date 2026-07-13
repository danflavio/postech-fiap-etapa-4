# Postech FIAP - Etapa 4

> **Status:** Em desenvolvimento  
> **Curso:** Pós-Tech FIAP | **Etapa:** 4  
> **Autor:** [Dan Flavio](https://github.com/danflavio)

Aplicativo **mobile** de leitura de blogs desenvolvido com **React Native + Expo**, como projeto da Etapa 4 da pós-graduação Postech FIAP.

---

## Tech Stack

**Mobile:** React Native 0.81 · Expo SDK 54 · Expo Router · TypeScript  
**Navegação:** React Navigation (Native Stack + Bottom Tabs)  
**Animações:** react-native-reanimated · react-native-gesture-handler  
**Linting:** ESLint com configuração oficial do Expo  
**Plataformas:** Android · iOS · Web

---

## Funcionalidades (em construção)

- [x] Catálogo de posts com lista e busca
- [ ] Detalhes do post
- [ ] Integração com API backend
- [ ] Autenticação

---

## Pré-requisitos

- Node.js v18+
- npm / yarn
- Expo Go (dispositivo físico) ou emulador Android/iOS

---

## Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/danflavio/postech-fiap-etapa-4.git
cd postech-fiap-etapa-4/blog-mobile

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npx expo start
```

No terminal, pressione `a` (Android), `i` (iOS) ou `w` (Web) para abrir o app.

---

## Estrutura do Projeto

```
postech-fiap-etapa-4/
└── blog-mobile/              # Aplicação mobile
    ├── app/                  # Expo Router (roteamento baseado em arquivos)
    │   ├── _layout.tsx       # Layout raiz (Stack navigator)
    │   └── (tabs)/           # Abas: Home e Explore
    ├── src/
    │   ├── pages/            # Telas do blog (Home, PostDetail)
    │   ├── components/       # Componentes reutilizáveis
    │   ├── context/          # Contextos React
    │   └── services/         # Integrações com backend (futuro)
    ├── components/           # Componentes de UI compartilhados
    ├── constants/            # Tema (cores, fontes)
    └── hooks/                # Hooks personalizados
```

---

## Scripts (blog-mobile)

| Comando              | Descrição                     |
|----------------------|-------------------------------|
| `npm start`          | Inicia o Expo dev server      |
| `npm run android`    | Inicia no Android             |
| `npm run ios`        | Inicia no iOS                 |
| `npm run web`        | Inicia no navegador           |
| `npm run lint`       | Executa o linter              |

---

## Licença

Distribuído sob a licença MIT.
