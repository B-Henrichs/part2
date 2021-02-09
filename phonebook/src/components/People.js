import React from 'react'

const People = ({Person, personsToShow, removeEntry}) => {  
    //returns layout and uses map method on array returned with search filter(if any)
    //map function takes intrustions from Person component
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