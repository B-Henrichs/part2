import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './Form'
import Person from './Person'
import Search from './Search'
import People from './People'








const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        
  })
  }, [])
 



  const addPerson = (event) => {
    event.preventDefault()
    
    console.log('button clicked',persons)

    if (persons.some( person => person.name === newName)){
        window.alert(`${newName} is already in the phonebook`)
    return;}
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    
    setNewSearch(event.target.value)
  }
  
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch) === true)
    
  
  return (
      
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a new Person</h3>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <People personsToShow={personsToShow} Person={Person}/>
     
    </div>
    
  )
}

export default App