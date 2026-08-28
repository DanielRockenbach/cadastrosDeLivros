require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const seed = [
  { id: 1, titulo: 'Clean Code', autor: 'Robert C. Martin', categoria: 'Tecnologia', ano: 2008, status: 'disponivel', descricao: 'Livro sobre boas práticas de desenvolvimento de software.' },
  { id: 2, titulo: 'O Estrangeiro', autor: 'Albert Camus', categoria: 'Literatura', ano: 1942, status: 'emprestado', descricao: 'Um clássico sobre absurdo, liberdade e escolhas.' },
  { id: 3, titulo: 'A Arte da Guerra', autor: 'Sun Tzu', categoria: 'História', ano: 500, status: 'disponivel', descricao: 'Estratégia e liderança através dos séculos.' },
];
let livros = [...seed];
let collection;

async function conectarMongo() {
  if (!process.env.MONGODB_URI) return;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  collection = client.db(process.env.MONGODB_DB || 'm7_frontend').collection('livros');
  if (await collection.countDocuments() === 0) await collection.insertMany(seed);
  console.log('MongoDB Atlas conectado');
}
async function listar() { return collection ? collection.find({}).sort({ id: 1 }).toArray() : livros; }
async function buscar(id) { return collection ? collection.findOne({ id }) : livros.find((livro) => livro.id === id); }

app.get('/api/health', (req, res) => res.json({ status: 'ok', storage: collection ? 'mongodb' : 'memory' }));
app.get('/api/livros', async (req, res) => { try { res.json(await listar()); } catch (error) { res.status(500).json({ erro: 'Falha ao listar livros.' }); } });
app.get('/api/livros/:id', async (req, res) => { const livro = await buscar(Number(req.params.id)); if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' }); res.json(livro); });
app.post('/api/livros', async (req, res) => { const { titulo, autor, categoria, ano, status = 'disponivel', descricao = '' } = req.body; if (!titulo || !autor || !categoria || !ano) return res.status(400).json({ erro: 'Título, autor, categoria e ano são obrigatórios.' }); const livro = { id: collection ? await collection.countDocuments() + 1 : (Math.max(0, ...livros.map((item) => item.id)) + 1), titulo, autor, categoria, ano: Number(ano), status, descricao }; try { if (collection) await collection.insertOne(livro); else livros.push(livro); res.status(201).json(livro); } catch (error) { res.status(500).json({ erro: 'Falha ao cadastrar livro.' }); } });
app.put('/api/livros/:id', async (req, res) => { const id = Number(req.params.id); const atual = await buscar(id); if (!atual) return res.status(404).json({ erro: 'Livro não encontrado.' }); const atualizado = { ...atual, ...req.body, id }; try { if (collection) await collection.replaceOne({ id }, atualizado); else livros = livros.map((item) => item.id === id ? atualizado : item); res.json(atualizado); } catch (error) { res.status(500).json({ erro: 'Falha ao atualizar livro.' }); } });
app.delete('/api/livros/:id', async (req, res) => { const id = Number(req.params.id); const atual = await buscar(id); if (!atual) return res.status(404).json({ erro: 'Livro não encontrado.' }); try { if (collection) await collection.deleteOne({ id }); else livros = livros.filter((item) => item.id !== id); res.status(204).send(); } catch (error) { res.status(500).json({ erro: 'Falha ao excluir livro.' }); } });

conectarMongo().then(() => app.listen(port, () => console.log(`API Lume em http://localhost:${port}`))).catch((error) => { console.error('MongoDB indisponível:', error.message); app.listen(port, () => console.log(`API Lume em http://localhost:${port} (memória)`)); });
