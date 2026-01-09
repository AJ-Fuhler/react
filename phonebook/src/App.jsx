import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <p>filter shown with</p>
      <input onChange={handleFilter} value={filter}/>
    </div>
  )
}

const Form = ({ handleNewName, handleNewNumber, handleSubmit, newName, newNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter, removePerson }) => {
  let personsToShow;
  if (filter === '') {
    personsToShow = persons;
  } else {
    personsToShow = persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <>
      {personsToShow.map(({ name, number, id }) => <p key={id}>{name} {number} <button onClick={() => removePerson(id)}>delete</button></p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }

  useEffect(hook, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    if (trimmedName === '') return

    if (persons.some(person => person.name === trimmedName)) {
      alert(`${trimmedName} is already added to phonebook`)
      setNewName('')
      return
    }

    personService
      .create({name: trimmedName, number: newNumber.trim()})
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    let person = persons.find(p => p.id === id)
    let response = window.confirm(`Delete ${person.name}?`)
    if (response) {
      personService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <Form
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons filter={filter} persons={persons} removePerson={removePerson} />
    </div>
  )
}
export default App