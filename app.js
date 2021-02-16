const express = require('express');
const app = express();
app.use(express.json()); // Para que a API receba dados no formato JSON

const contatos = ["Huguinho", "Zezinho", "Luizinho", "Zequinha"];

app.get('/', (req, res) => {
  res.json(contatos);
});

app.get('/contatos/:id', (req, res) => {
  const { id } = req.params;
  const { situacao } = req.query;
  return res.json({ 
    id, 
    name: "Paulo", 
    situacao 
  });
});

app.post('/contatos', (req, res) => {
  const { name } = req.body;
  contatos.push(name);
  return res.json(contatos);
});

app.listen(8080, () => {
  console.log('Server running in port 8080');
});