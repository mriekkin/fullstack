import React from 'react';
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  includesName(name) {
    return this.state.persons.find(p => p.name === name) !== undefined
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.includesName(this.state.newName)) {
      alert("Person exists: enter another name")
      return
    }

    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(person)

    this.setState({
      persons: persons,
      newName: '',
      newNumber: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />

        <h3>Lisää uusi</h3>
        <AddPerson 
          addPerson={this.addPerson}
          newName={this.state.newName}
          handleNameChange={this.handleNameChange}
          newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange}
        />
        
        <h3>Numerot</h3>
        <Persons
          persons={this.state.persons}
          filter={this.state.filter}
        />
      </div>
    )
  }
}

export default App