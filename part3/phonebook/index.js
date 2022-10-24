require("dotenv").config()

const express = require("express")
const morgan = require("morgan")

const app = express()

const cors = require("cors")
const Person = require("./models/persons")

app.use(express.static("build"))
app.use(cors())

// eslint-disable-next-line no-unused-vars
morgan.token("data", (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)

const { PORT } = process.env
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)
