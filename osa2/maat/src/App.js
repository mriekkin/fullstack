import React from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      all: [],
      matching: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        this.setState({
          all: response.data
        })
      })
  }

  handleFilterChange = (event) => {
    const filter = event.target.value
    const getMatching = () =>
      this.state.all.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase()))

    this.setState({
      matching: getMatching(),
      filter: filter
    })
  }

  handleClick = (country) => {
    this.setState({
      matching: [country],
      filter: country.name
    })
  }

  render() {
    return (
      <div>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange} />
        <Countries
          countries={this.state.matching}
          handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App