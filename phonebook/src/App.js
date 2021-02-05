import React, { useState, useEffect } from 'react'

import Form from './components/Form'
import Person from './components/Person'
import Search from './components/Search'
import People from './components/People'
import phoneService from './services/phoneBook'








const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    
   phoneService
      .getAll()
      .then(initialBook => {
        setPersons(initialBook)
        
  })
  }, [])
 



  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some( person => person.name === newName)){
        window.alert(`${newName} is already in the phonebook`)
    return;}
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    phoneService
      .create(personObject)
      .then( returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    
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

  const removeEntry = (event) => {
    event.preventDefault()
   
   console.log("click")
   
    
    
    
  }
  
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch) === true)
    
  
  return (
      
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a new Person</h3>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <People personsToShow={personsToShow} Person={Person} removeEntry={removeEntry}/>
     
    </div>
    
  )
}

export default App