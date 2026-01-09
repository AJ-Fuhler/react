import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ c }) => {
  return (
    <div>
      <h2>{c.name.common}</h2>
      <p>capital: {c.capital?.[0]}</p>
      <p>area: {c.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(c.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={c.flags.png} alt={`Flag of ${c.name.common}`} width="160" />
    </div>
  )
}

const Countries = ({ countries, setSelectedCountry }) => {
  if (countries.length === 0) {
    return (
      <p>No matches were found</p>

    )
  }

  if (countries.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }

  if (countries.length === 1) {
    const c = countries[0]
    return (
      <Country c={c} />
    )
  }

  return (
    <div>
      {countries.map(c => {
        return (
          <p key={c.cca2}>{c.name.common} <button onClick={() => setSelectedCountry(c)}>Show</button></p>
        )

      })}
    </div>
  )

}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setCountries([])
      setSelectedCountry(null)
      return
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${query}?fullText=false`)
      .then(response => {
        setCountries(response.data)
        setSelectedCountry(null)
      })
      .catch(error => {
        console.error("Error fetching countries:", error)
        setCountries([])
      })
  }, [query])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <label>
        find countries
        <input onChange={handleChange} value={query} />
      </label>
      <Countries countries={countries} setSelectedCountry={setSelectedCountry}/>
      {selectedCountry && <Country c={selectedCountry} />}
    </div>
  )
}

export default App
