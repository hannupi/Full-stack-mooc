import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(axiosResponse => {
        setPersons(axiosResponse.data)
      })
  }, [])


  const submitInfo = (event) => {
    event.preventDefault()
    const infoObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find(({ name }) => name === infoObject.name)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(infoObject))
    }
    setNewName("")
    setNewNumber("")
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => setFilter(event.target.value)

  const personsFiltered = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChange={filterChange} />

      <h2>Add a new</h2>
      <Form
        submitInfo={submitInfo}
        newName={newName}
        nameChange={nameChange}
        newNumber={newNumber}
        numberChange={numberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </div>
  )
}

export default App