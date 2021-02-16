const express = require('express');
const app = express();
app.use(express.json()); // For the "API" to receive data in JSON format

// This array is simulating a database  
const contacts = ["Huguinho", "Zezinho", "Luizinho", "Zequinha"];

// Middleware function
function validateContact(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "It's necessary to send the name!"
    })
  }
  return next();
}

// Middleware function
function validateContactPosition(req, res, next) {
  if (!contacts[req.params.id]) {
    return res.status(400).json({
      error: "Contact not found"
    })
  }
  return next();
}

// CREATE
app.post('/contacts', validateContact, (req, res) => {
  const { name } = req.body;
  contacts.push(name);
  return res.json(contacts);
});


// READ
app.get('/', (req, res) => {
  res.json(contacts);
});

app.get('/contacts/:id', validateContactPosition, (req, res) => {
  const { id } = req.params;
  return res.json({ 
    name: contacts[id], 
  });
});


// UPDATE
app.put('/contacts/:id', validateContactPosition, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  contacts[id] = name;
  return res.json(contacts);

});

// DELETE
app.delete('/contacts/:id', validateContactPosition, (req, res) => {
  const { id } = req.params;
  contacts.splice(id, 1);
  return res.json(contacts);
});


app.listen(8080, () => {
  console.log('Server running in port 8080');
});