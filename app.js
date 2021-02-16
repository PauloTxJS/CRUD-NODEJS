const express = require('express');
const app = express();
app.use(express.json()); // Para que a API receba dados no formato JSON

const contatos = ["Huguinho", "Zezinho", "Luizinho", "Zequinha"];

app.get('/', (req, res) => {
  res.json(contatos);
});

app.get('/contatos/:id', (req, res) => {
  const { id } = req.params;
  return res.json({ 
    name: contatos[id], 
  });
});

app.post('/contatos', (req, res) => {
  const { name } = req.body;
  contatos.push(name);
  return res.json(contatos);
});

app.put('/contatos/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  contatos[id] = name;
  return res.json(contatos);

});

app.delete('/contatos/:id', (req, res) => {
  const { id } = req.params;
  contatos.splice(id, 1);
  return res.json(contatos);
});

app.listen(8080, () => {
  console.log('Server running in port 8080');
});