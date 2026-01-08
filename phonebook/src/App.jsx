import { useState } from 'react'

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

const Persons = ({ persons, filter }) => {
  let personsToShow;
  if (filter === '') {
    personsToShow = persons;
  } else {
    personsToShow = persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <>
      {personsToShow.map(({ name, number, id }) => <p key={id}>{name} {number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    setPersons([...persons, {name: trimmedName, number: newNumber.trim(), id: persons.length + 1}])
    setNewName('')
    setNewNumber('')

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

      <Persons filter={filter} persons={persons} />
    </div>
  )
}
export default App