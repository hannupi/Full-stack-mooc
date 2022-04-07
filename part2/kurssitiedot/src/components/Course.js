import React from 'react'

const Header = ({ header }) => <h2>{header}</h2>

const Parts = ({ course }) => {
    const everyPart = () => course.map(x =>
        <p key={x.id}>
            {x.name} {x.exercises}
        </p>
    )
    return (
        <p>
            {everyPart()}
        </p>
    )
}

const TotalCounter = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

const Course = ({ course, }) => {
    return (
        <div>
            <Header header={course.name} />

            <Parts course={course.parts} />

            <TotalCounter parts={course.parts} />

        </div>
    )
}


export default Course