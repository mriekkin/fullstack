import React from 'react'

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

const Otsikko = ({ kurssi }) => {
  return (
    <h2>{kurssi.nimi}</h2>
  )
}

const Sisalto = ({ kurssi }) => {
  return (
      <div>
        {kurssi.osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
      </div>
  )
}

const Osa = ({ osa }) => {
  return (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Yhteensa = ({ kurssi }) => {
  const lkm = kurssi.osat.reduce((sum, osa) => sum += osa.tehtavia, 0)
  return (
    <p>yhteensä {lkm} tehtävää</p>
  )
}

export default Kurssi