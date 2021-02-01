import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const xsum = course.parts.map(parts =>
      parts.exercises
      )
    const sum = xsum.reduce((accumulator,currentValue) => accumulator + currentValue, 0 )
  
  console.log('xsum is', xsum)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  
  
  const Content = ({ course }) => {
    
      console.log("the course is",course)
      return(
        <ul >
      {course.parts.map(parts => 
        <li key={parts.id}>
          {parts.name} {parts.exercises}
          </li>
          )}
      
      </ul>
      )
  }
  
  const Course =({course})=> {
    return(
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course}/>
      </div>
    )
  }
  
  
  
export default Course