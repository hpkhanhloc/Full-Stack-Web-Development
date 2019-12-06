import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />        
        </div>
  )
}
const Header = (props) => {
    return (
        <>
           <h1>{props.course}</h1>
        </>
    )
}
const Content = (props) => {
    const [a,b,c] = props.parts
    return(
        <>
            <Part name={a.name} exercises={a.exercises} />
            <Part name={b.name} exercises={b.exercises} />
            <Part name={c.name} exercises={c.exercises} />
        </>
    )    
}
const Part = (props) => {
    return(
        <>
            <p>
                Part: {props.name}, exercises: {props.exercises}
            </p>  
        </>
    )    
}

const Total = (props) => {
    let exercises = 0
    props.parts.forEach(element => {
        exercises = exercises + element.exercises
    })
    return (       
        <>
            <p>
                Number of exercises: {exercises}
            </p>
           
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
