const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function generateId() {
  return Math.floor(Math.random() * 100000);
}

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const personCount = persons.length;
  const date = new Date();
  response.send(`
  <p>Phonebook has info for ${personCount} people</p>
  <p>${date}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const found = persons.find((p) => p.name === body.name);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  } else if (found) {
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };
    persons = persons.concat(person);
    return response.json(person);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
