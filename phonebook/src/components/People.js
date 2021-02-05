import React from 'react'

const People = ({Person, personsToShow, removeEntry}) => {
    
    return(
        
        <div>
            <h2>Numbers</h2>
            
    <ul>
          {personsToShow.map(person =>
            <Person key={person.name} person={person} removeEntry={removeEntry}/>    
            )}
      </ul>
      </div>
)}
export default People