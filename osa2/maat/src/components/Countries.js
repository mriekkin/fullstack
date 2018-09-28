import React from 'react'

const Countries = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return (
      <div>
        too many matches, specify another filter
      </div>
    )
  }
  
  if (countries.length === 1) {
    return (
      <div>
        <CountryInfo country={countries[0]} />
      </div>
    )
  }

  return (
    <div>
      {countries.map(country =>
        <CountryName
          key={country.name}
          country={country}
          handleClick={handleClick} />)}
    </div>
  )
}

const CountryName = ({ country, handleClick }) => {
  return (
    <div onClick={e => handleClick(country)}>
      {country.name}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name} {country.nativeName}</h2>
      <div>
        capital: {country.capital}
      </div>
      <div>
        population: {country.population}
      </div>
      <img src={country.flag} width="280" alt="flag" />
    </div>
  )
}

export default Countries