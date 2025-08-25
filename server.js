const express = require('express');
const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Dados simulados (como se fosse um banco de dados)
let maquinas = [
  { id: 1, maquina: 'Atlas copco', temperatura: 100, umidade: 85, pressao: 4 },
  { id: 1, maquina: 'Fiat 147', temperatura: 170, umidade: 100, pressao: 20 }
];

// Rota GET - listar todos os usuários
app.get('/maquinas', (req, res) => {
  res.json(maquinas);
});

// Rota GET - buscar usuário por ID
app.get('/maquinas/:id', (req, res) => {
  const maquina = maquinas.find(u => u.id == req.params.id);
  maquina ? res.json(maquina) : res.status(404).json({ erro: 'Maquina não encontrado' });
});

// Rota POST - adicionar novo usuário
app.post('/maquinas', (req, res) => {
  const novaMaquina = {
    id: maquinas.length + 1,
    maquina: req.body.maquina,
    temperatura: req.body.temperatura,
    umidade: req.body.umidade,
    pressao: req.body.pressao
  };
  maquinas.push(novaMaquina);
  res.status(201).json(novaMaquina);
});

// Rota DELETE - remover usuário por ID
app.delete('/maquinas/:id', (req, res) => {
  maquinas = maquinas.filter(u => u.id != req.params.id);
  res.json({ mensagem: 'Maquina removido com sucesso' });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
