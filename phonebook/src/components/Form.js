import React from 'react'

const Form = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
  <form onSubmit ={addPerson}>
    <div>
      name: <input 
        value={newName} 
        onChange={handleNameChange}/>
    </div>
    <div>
        number:<input 
        value={newNumber}
        onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">update phonebook</button>
    </div>
  </form>
    
  )
}
export default Form