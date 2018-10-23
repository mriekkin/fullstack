import React from 'react'

const Persons = ({ persons, filter, handleDeleteOf }) => {
  const filterLow = filter.toLowerCase()
  return (
    <div>
      <table>
        <tbody>
          {persons
            .filter(person => person.name.toLowerCase().includes(filterLow))
            .map(person =>
              <Person
                key={person.id}
                person={person} 
                handleDelete={handleDeleteOf(person.id)} />)}
        </tbody>
      </table>
    </div>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handleDelete}>poista</button></td>
    </tr>
  )
}

export default Persons