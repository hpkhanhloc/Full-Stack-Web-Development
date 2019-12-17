import React from 'react'

const Course = ({course}) => {
    const Header = ({name}) => <h1>{name}</h1>

    const Content = ({parts}) => parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    )

    const Part = ({name, exercises}) => <p>{name} {exercises}</p>  

    const Total = ({parts}) => {
        const total = parts.reduce((sum, order) => sum + order.exercises,0)
        return(
            <p><b>Total of {total} exercises</b></p>
        )
}
    
    return(
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course