import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Limit = ({ selectedCountries, setSelectedCountries }) => {
  if (selectedCountries.length === 1) {
    return (
      <RenderResult result={selectedCountries[0]} />
    )
  }
  else if (selectedCountries.length <= 10 && selectedCountries.length > 1) {
    return (
      <div>
        {selectedCountries.map(name => (
          <ol key={name}>
            {name.name}
            <button onClick={()=> setSelectedCountries([name])}>show</button>
          </ol>
        ))}
      </div>
    )
  }
  else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

}

const RenderResult = ({ result }) => {
  return (
    <div>
      <h2>{result.name}</h2>
      <div>
        capital: {result.capital}
      </div>
      <div>
        area: {result.area}
      </div>
      <h3>languages:</h3>
      <ul>
        {result.languages.map(({ name }) => <li>{name}</li>)}
      </ul>
      <img alt="Countrys flag" src={result.flag} width="100" />

      <h2>Weather in {result.name}</h2>
    </div>
  )
}

function App() {
  const [results, setResults] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  // Tässä jostain syystä APIn uudempi versio ei suostu toimimaan, jouduin käyttämään vanhempaa versiota.
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then(dataResponse => {
        setResults(dataResponse.data)
      })
  }, [])
  console.log("length: ", results.length)



  const searchChange = event => {
    const resultsFiltered = results.filter(result => result.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setSelectedCountries(resultsFiltered)
  }
  console.log(selectedCountries.length)

  return (
    <div>
      find countries <input onChange={searchChange} />
      <Limit selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />

    </div>
  )
}

export default App;
