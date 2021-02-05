import React from 'react'


const Person = ({ person, removeEntry }) => {
  
  return (
    <li>{person.name} {person.number} <button onClick={removeEntry}>Remove Entry</button> </li>
    
  )
}

export default Person