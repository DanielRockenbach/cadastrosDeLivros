# Lume | Biblioteca de livros

Aplicacao final do modulo M7: Angular + TypeScript no frontend, API REST Node.js/Express e persistencia MongoDB Atlas no backend.

## Aplicacao publicada

- [Acessar interface frontend](https://cadastrosdelivros-frontend.onrender.com)
- [Acessar API](https://cadastrosdelivros-ws.onrender.com/api/livros)

## Executar localmente

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Em outro terminal:

```powershell
cd frontend
npm install
npm start
```

Acesse `http://localhost:4200/livros`. Sem `MONGODB_URI`, a API inicia com dados de demonstracao em memoria. Para persistencia real, preencha apenas o `.env` local com a string do MongoDB Atlas; ele e ignorado pelo Git.

## Endpoints

- `GET /api/livros`
- `GET /api/livros/:id`
- `POST /api/livros`
- `PUT /api/livros/:id`
- `DELETE /api/livros/:id`
- `GET /api/health`

## Publicacao no Render

Crie um Web Service apontando para `backend`, comando `npm start`, e configure `MONGODB_URI` e `MONGODB_DB`. Crie um Static Site apontando para `frontend`, comando de build `npm install && npm run build`, publicando `frontend/dist/frontend/browser` (ou a pasta indicada pelo build). Antes do deploy, altere `apiUrl` em `frontend/src/app/features/livros/services/livros.service.ts` para a URL pública da API.
