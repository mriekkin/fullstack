import React from 'react'

const Persons = ({ persons, filter }) => {
  const filterLow = filter.toLowerCase()
  return (
    <div>
      <table>
        <tbody>
          {persons
            .filter(person => person.name.toLowerCase().includes(filterLow))
            .map(person =>
              <Person key={person.name} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}

export default Persons