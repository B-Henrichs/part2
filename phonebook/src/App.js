//import react + components
import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Person from './components/Person'
import Search from './components/Search'
import People from './components/People'
import phoneService from './services/phoneBook'
import Notification from './components/Notification'







const App = () => {

  //establishes states
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  //use axios to get import db.json file requires json server to be run
  useEffect(() => {
   phoneService
      .getAll()
      .then(initialBook => {
        setPersons(initialBook)     
  })
  }, [])
 


//handles button click when the name field is a new value
  const addPerson = () => {
    
    // person generated from name field and number field
    const personObject = {
      name: newName,
      number: newNumber,  
    }
   
      //use axios to add person to to persons state array
       phoneService
      .create(personObject)
      .then( returnedPerson => {
        setErrorMessage(
          `Added ${returnedPerson.name} to the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('') 
    })
 
  }


//handles button click when name field is an existing value
  const updatePerson = () => {

    // asks user if this is what they ment to do
    const confirm = window.confirm(
      `${newName} is already added to phonebook, replace the old phone number with new one.`
    );

    // uses find method on persons array to match change with existing entry 
    const personToUpdate = persons.find((item) => item.name === newName)
    ;
    //uses copy method to return a new object with old name and new number
    const updatedPerson = { ...personToUpdate, number: newNumber };

    //only executes if user selects "ok" in prompt window
    if (confirm) {

      //axios put method to update the db.json file
      phoneService
        .update(updatedPerson.id, updatedPerson)
        .then((response) => {
          setErrorMessage(
            `Updated ${updatedPerson.name}'s entry`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          //takes response from json server and alters state array, returns identical
          //object if id does not match. if the id does match alter object to be response
          setPersons(persons.map((item) => (item.id === response.id ? response : item)))
      })
      .catch(error => {
        setErrorMessage(
          `'${updatedPerson.name}' was removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== updatedPerson.id))     
      })
      }
  }

//handles delete button click
const removeEntry = (event) => {
  event.preventDefault()

//returns the ID of the entry associated with this instance of the button
// if given as naked value does not properly update the array with set persons
//but does alter json server
console.log("value" ,event.target.value)
 const id = parseInt(event.target.value)
 console.log("id", id)

 //when called promts user
 const confirm = window.confirm("are you sure?")

 //check to see if the user confirms in the prompt window
 if (confirm){

  //calls axios delete method to remove the person from the json database
  phoneService
    .removeEntry(event.target.value)
    .then( response => {
      console.log(persons[id-1].name)
      setErrorMessage(
        `Deleted ${persons[id-1].name}'s entry`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      //uses filter method on persons state array to return a new array without the removed entry
      setPersons(persons.filter(n => n.id !== id))
    })
}}


  //decides which function to call when the button is pressed 
  //depending on if the name is a new value or not
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // uses filter method on persons array and creates a new array of names
    //match the name field.
    const isNameExist = persons.filter(
      (item) => item.name.toLocaleLowerCase() === newName.toLowerCase()
    ).length;

      //if the isNameExist array is empty then the name field
      //does not match any existing values, add the person 
    if (!isNameExist) {
      addPerson();

      //otherwise update the entry
    } else {
      updatePerson();
    }

    //reset the name and number field
        setNewName('')
        setNewNumber('')
  };


    
    
    
  
  //these change the fields when user types
  const handleNameChange = (event) => {
   setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
  setNewSearch(event.target.value)
  }


  
  //filters the person array to only display entrys that match the search field
  const personsToShow =  persons.filter(person => person.name.toLowerCase().includes(newSearch) === true)
    
  
  return (

      //layout and call components
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <h3>Search</h3>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Update Phonebook</h3>
      <Form addPerson={handleFormSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <People personsToShow={personsToShow} Person={Person} removeEntry={removeEntry}/>
     
    </div>
    
  )
}

export default App