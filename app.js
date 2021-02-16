const express = require('express');
const app = express();
app.use(express.json()); // Para que a API receba dados no formato JSON

const contatos = ["Huguinho", "Zezinho", "Luizinho", "Zequinha"];


function valContato(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Necessário enviar o nome!"
    })
  }
  return next();
}

function valPosContato(req, res, next) {
  if (!contatos[req.params.id]) {
    return res.status(400).json({
      error: "Contato não encontrado"
    })
  }
  return next();
}

app.get('/', (req, res) => {
  res.json(contatos);
});

app.get('/contatos/:id', valPosContato, (req, res) => {
  const { id } = req.params;
  return res.json({ 
    name: contatos[id], 
  });
});

app.post('/contatos', valContato, (req, res) => {
  const { name } = req.body;
  contatos.push(name);
  return res.json(contatos);
});

app.put('/contatos/:id', valPosContato, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  contatos[id] = name;
  return res.json(contatos);

});

app.delete('/contatos/:id', valPosContato, (req, res) => {
  const { id } = req.params;
  contatos.splice(id, 1);
  return res.json(contatos);
});

app.listen(8080, () => {
  console.log('Server running in port 8080');
});