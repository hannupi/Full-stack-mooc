import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const res = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState("")

  if (!props.show) {
    return null
  }

  var books = []
  if (!res.loading) {
    books = res.data.allBooks

  }

  var filteredGenres = [...new Set(books.flatMap(book => book.genres))]
  // If button is pressed to give genre value, start conditionally rendering
  if (genre.length > 0)
    books = books.filter(book => book.genres.includes(genre))


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredGenres.map(genre => (
        <button key={genre} value={genre} onClick={e => setGenre(e.target.value)}>{genre}</button>
      ))}
      <button value="" onClick={e => setGenre(e.target.value)}>All genres</button>
    </div>
  )
}

export default Books
