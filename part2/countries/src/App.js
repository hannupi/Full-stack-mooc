import axios from 'axios'
import React, { useState, useEffect } from 'react'

const SearchBar = ({ search, searchChange }) => {
  return (
    <div>
      find countries <input value={search} onChange={searchChange} />
    </div>
  )
}

const Results = ({ results }) => {
  console.log("tassa",results)
  return (
    <div>
      <p></p>
    </div>
  )
}

/*
const Result = ({ result }) => {
  return (
    <div>
      <h1>{result.name}</h1>
      <div>capital {result.capital}</div>
      <div>population {result.population}</div>
      <div>
        <h3>Spoken languages</h3>
        <ul>
          {result.languages.map(
            language => <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <div><img alt={`${result.name} flag`} src={result.flag} /></div>
      </div>
    </div>
  )
}
*/ 

function App() {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(dataResponse => {
        setResults(dataResponse.data)
      })
  }, [])


  //const countriesFiltered = results.filter(result => result.includes(search))

  const searchChange = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
    var testi = results.filter(results => results.name === "Finland")
    console.log("123", testi)
  }



  return (
    <div>
      <SearchBar search={search} searchChange={searchChange} />
      <Results results={results} />
    </div>
  )
}

export default App;
