require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/persons");
app.use(express.static("build"));
app.use(cors());

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// app.get("/api/persons/:id", (request, response) => {
//   let id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);
//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

// app.post("/api/persons", (request, response) => {
//   const body = request.body;
//   const found = persons.find((p) => p.name === body.name);
//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: "The name or number is missing",
//     });
//   } else if (found) {
//     return response.status(400).json({
//       error: "The name already exists in the phonebook",
//     });
//   } else {
//     const person = {
//       name: body.name,
//       number: body.number,
//       id: generateId(),
//     };
//     persons = persons.concat(person);
//     return response.json(person);
//   }
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
