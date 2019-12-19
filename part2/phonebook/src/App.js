import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ filterName, setNameFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialBook => {
        setPersons(initialBook)
      })
  },[])

  const deletePersonOf = (id, name) => {
    if (window.confirm(`Detele ${name}`)) {
      personService
      .del(id)
      .then(returnedBook => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(
          `${name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        setPersons(persons.filter(n => n.id !== id))
      })
    } 
  }
  const booktoShow = persons.some(person => person.name.toLowerCase().match(filterName.toLowerCase())) ?
    persons.filter(person => person.name.toLowerCase().match(filterName.toLowerCase()))
    : persons

  const rows = () => booktoShow.map(person =>
    <Person 
      key={person.id} person={person} deletePerson={() => deletePersonOf(person.id, person.name)}/>
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter filterName={filterName} setNameFilter={setNameFilter}/>
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} 
      newNumber={newNumber} setNewNumber={setNewNumber} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}
const Filter = ({filterName, setNameFilter}) => {
  const handleNameFilter = (event) => setNameFilter(event.target.value)
  return(
    <div>
        Filter shown with <input value={filterName} onChange={handleNameFilter} />
    </div>
  )  
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, setPersons, persons, setSuccessMessage, setErrorMessage}) => {

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)){
      const matchedperson = persons.find(person => person.name === newName)
      const changedperson = {...matchedperson, number: newNumber}
      if (window.confirm(`${matchedperson.name} is already added to phone book, replace the old number with new one?`)){
        personService
          .update(matchedperson.id, changedperson)
          .then(returnedBook => {
            setPersons(persons.map(person => person.id !== matchedperson.id ? person : returnedBook))
            setSuccessMessage(
              `${matchedperson.name} updated number`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`${error.response.data}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
      .create(personObject)
      .then(returnedBook => {
        setPersons(persons.concat(returnedBook))
        setSuccessMessage(
          `Added ${newName}`
        )
        setTimeout(() =>{
          setSuccessMessage(null)
        },5000)
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    }

    setNewName('') 
    setNewNumber('')
  }
  
  return(
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
export default App
