import React from 'react'

const People = (props) => {
    return(
        
        <div>
            <h2>Numbers</h2>
    <ul>
          {props.personsToShow.map(person =>
            <props.Person key={person.name} person={person}/>
            )}
      </ul>
      </div>
)}
export default People