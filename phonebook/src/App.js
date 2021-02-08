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
    
    const personObject = {
      name: newName,
      number: newNumber,
      
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
   setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
  setNewSearch(event.target.value)
  }

  const removeEntry = (event) => {
    event.preventDefault()
   const id = parseInt(event.target.value)
   console.log("click", )
   const confirm = window.confirm("are you sure?")
   if (confirm){
    phoneService
      .removeEntry(event.target.value)
      .then( returnedObject => {
        console.log("returned Obj",returnedObject)
        setPersons(persons.filter(n => n.id !== id))
      })
      
  
   
    
  }}
  
  const personsToShow =  persons.filter(person => person.name.toLowerCase().includes(newSearch) === true)
    
  
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