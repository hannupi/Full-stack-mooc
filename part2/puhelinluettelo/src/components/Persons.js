import React from "react";

const Person = ({ name,number }) => <p>{name} {number}</p>

const Persons = ({ persons,filter }) => {
    //2.9 korjaa haku
    if (filter.length > 0) {
        return (
            persons.filter(person => person.includes("Arto")).map(person => (
                <Person key={person.name} name={person.name} number={person.number} />
            ))
        )
    }
    else {
        return(
            persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)
        )
        
    }
}


export default Persons;