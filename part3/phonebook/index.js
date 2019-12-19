if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json())

app.use(cors())

morgan.token('data', function getData (res) {
    return JSON.stringify(res.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

/*let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
  ]*/

  app.use(express.static('build'))

  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
  })
  
  app.get('/info', (req, res) => {
      const date = new Date()
      Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info of ${persons.length} <br> ${date}</p>`)
      })
  }) 

  app.get('/api/persons/:id', (request, response, next) =>{
      Person.findById(request.params.id)
        .then(person =>{
          if (person) {
            response.json(person.toJSON())
          } else {
            response.status(404).end()
          }         
        })
        .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request,response, next) => {
      Person.findByIdAndRemove(request.params.id)
        .then(result => {
          if (result) {
            response.status(204).end()
          } else {
            response.status(404).end()
          } 
      })
        .catch(error => next(error)) 
  })

/*  const generateID = () => {
      const maxID = persons.length > 0 
      ? Math.round(Math.random() * (100) ) 
      : 0
      return maxID + 1
  }
  */

  app.post('/api/persons', (request, response, next) => {
      const body = request.body
      if (!body.name || !body.number) {
          return response.status(400).json({
              error: 'name or number missing'
          })
      }
      const person =  new Person({
        name: body.name,
        number: body.number,
      })
      person.save()
        .then(savedPerson => {
        response.json(savedPerson.toJSON())
      })
        .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true})
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId'){
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  
  next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})