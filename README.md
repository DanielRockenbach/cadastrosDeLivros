# M7 - Biblioteca de Livros

## Aluno
Daniel Amaral Rockenbach

## Objetivo

Implementar uma aplicação frontend com Angular e TypeScript, integrada com um backend API REST em Node.js/Express e persistência de dados em MongoDB Atlas.

## Funcionalidades

- Listagem de livros
- Pesquisa por título
- Filtro por categoria/gênero
- Página de detalhes do livro
- Criar novo livro
- Editar livro existente
- Deletar livro
- Indicador de carregamento
- Tratamento de erro
- Lista vazia com mensagem

## Rotas

- `/`
- `/livros`
- `/livros/:id`
- `/livros/novo`
- `/livros/:id/editar`

## Comandos

### Frontend

```powershell
cd frontend
npm install
npm start
```

Acesse `http://localhost:4200/livros`

### Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Sem `MONGODB_URI`, a API inicia com dados de demonstração em memória.

### Compilação TypeScript

```powershell
npx tsc --noEmit
```

### Build para Produção

```powershell
npm run build
```

## Endpoints da API

- `GET /api/livros`
- `GET /api/livros/:id`
- `POST /api/livros`
- `PUT /api/livros/:id`
- `DELETE /api/livros/:id`
- `GET /api/health`

## Aplicação Publicada

- [Interface Frontend](https://cadastrosdelivros-frontend.onrender.com)
- [API REST](https://cadastrosdelivros-ws.onrender.com/api/livros)
