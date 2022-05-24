import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, SET_BORN, } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState("")
  const [setBornTo, setBorn] = useState("")

  const [updateAuthor] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const res = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  var authors = []
  if (!res.loading) {
    authors = res.data.allAuthors
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log("submit", name)
    updateAuthor({ variables: { name, setBornTo } })

    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={e => setName(e.target.value)}>
            <option>
              -- PICK AUTHOR --
            </option>
            {authors.map(a =>
              <option key={a.name} value={a.name}>
                {a.name}
              </option>)}
          </select>
        </div>
        <div>
          born
          <input type="number" value={setBornTo} onChange={e => setBorn(Number(e.target.value))} />
        </div>
        <button type="submit">
          update
        </button>
      </form>
    </div>
  )
}

export default Authors
