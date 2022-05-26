import { useQuery } from "@apollo/client"
import { FAVORITE_GENRE, ALL_BOOKS } from "../queries"

const Recommend = (props) => {
    var books
    var favoriteGenre = ""
    var recommendedBooks
    const res = useQuery(FAVORITE_GENRE)
    if (!res.loading) {
        favoriteGenre = res.data.me.favoriteGenre
    }


    const booksQuery = useQuery(ALL_BOOKS)
    if (!booksQuery.loading) {
        books = booksQuery.data.allBooks
    }

    if (!props.show) {
        return null
    }

    if (favoriteGenre.length > 1) {
        recommendedBooks = books.filter(book => book.genres.includes(favoriteGenre))
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre "{res.data.me.favoriteGenre}"</p>
            <p>----------------------------------------------------------</p>
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recommendedBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend