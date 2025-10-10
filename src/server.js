// server.js​

// 1. Importa o Express e inicializa o app​
const express = require('express');
const app = express();
const port = 3001;

// 2. Middleware para processar o corpo das requisições JSON​
// Isso é essencial para receber dados via POST e PUT​
app.use(express.json());

// 3. Simulação de um "banco de dados" com um array de objetos​
let produtos = [
  { id: 1, nome: 'Notebook', preco: 4500 },
  { id: 2, nome: 'Mouse Gamer', preco: 250 },
  { id: 3, nome: 'Teclado Mecânico', preco: 500 },
];

let nextId = 4; // Variável para gerar novos IDs​

// --- Rotas CRUD ---​

// ROTA 1: Ler (READ) todos os produtos​
// Método: GET | URL: /produtos​
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// ROTA 2: Ler (READ) um produto específico por ID​
// Método: GET | URL: /produtos/:id​
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).send('Produto não encontrado.');
  }

  res.json(produto);
});

// ROTA 3: Criar (CREATE) um novo produto​
// Método: POST | URL: /produtos​
app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).send('Nome e preço são obrigatórios.');
  }

  const novoProduto = {
    id: nextId++,
    nome,
    preco,
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// ROTA 4: Atualizar (UPDATE) um produto por ID​
// Método: PUT | URL: /produtos/:id​
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex((p) => p.id === id);

  if (produtoIndex === -1) {
    return res.status(404).send('Produto não encontrado.');
  }

  const { nome, preco } = req.body;
  const produto = produtos[produtoIndex];

  if (nome !== undefined) {
    produto.nome = nome;
  }
  if (preco !== undefined) {
    produto.preco = preco;
  }

  res.json(produto);
});

// ROTA 5: Deletar (DELETE) um produto por ID​
// Método: DELETE | URL: /produtos/:id​
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = produtos.length;

  // Filtra o array, removendo o produto com o ID especificado​
  produtos = produtos.filter((p) => p.id !== id);

  if (produtos.length === initialLength) {
    return res.status(404).send('Produto não encontrado.');
  }

  // Resposta sem conteúdo (sucesso na deleção)​
  res.status(204).send();
});

// --- Inicia o Servidor ---​
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(
    'Para testar, use seu navegador (GET) ou um cliente HTTP como Postman/Insomnia (GET, POST, PUT, DELETE).'
  );
});