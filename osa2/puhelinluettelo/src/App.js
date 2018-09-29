import React from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
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

  findPerson(name) {
    return this.state.persons.find(p => p.name === name)
  }

  addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const existing = this.findPerson(this.state.newName)
    if (existing !== undefined) {
      this.updatePerson(existing.id, person)
      return
    }

    personService
      .create(person)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: ''
        })
      })
      .catch(err => {
        alert('Nimen lisääminen epäonnistui: \n\n' + err)
      })
  }

  updatePerson = (id, person) => {
    if (!window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      return
    }

    personService
      .update(id, person)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.map(person => person.id !== id ? person : newPerson),
          newName: '',
          newNumber: ''
        })
      })
  }

  handleDeleteOf = (id) => {
    return () => {
      const person = this.state.persons.find(person => person.id === id)

      if (window.confirm('poistetaanko ' + person.name)) {
        personService
          .remove(id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id)
            })
          })
      }
    }
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
          handleDeleteOf={this.handleDeleteOf}
        />
      </div>
    )
  }
}

export default App