import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import getPersons from './services/getPersons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    getPersons
      .getAll()
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

    if (persons.find(({ name }) => name.toLowerCase() === infoObject.name.toLowerCase())) {
      // Tarvii toimivamman IDn haun
      let findRightId = persons.filter(person => person.name === infoObject.name)
      let rightId = findRightId[0].id
      console.log(persons.map(person => person.id))
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        getPersons
          .update(rightId, infoObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== rightId ? person : response))
          })
      }
    }
    else {
      getPersons
        .createPerson(infoObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = event => {
    getPersons
      .deletePerson(event.target.value)
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => setFilter(event.target.value)

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filter))

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
      <Persons persons={personsFiltered} deletePerson={deletePerson} />
    </div>
  )
}

export default App