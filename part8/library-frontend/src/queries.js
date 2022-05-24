import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query Query {
  allBooks {
    title
    author
    published
  }
}`

export const ADD_BOOK = gql`
mutation (
  $title: String!, 
  $published: Int!, 
  $genres: [String!]!, 
  $author: String! ) {
  addBook(title: $title, published: $published, genres: $genres, author: $author) {
    title
    author
    published
    genres
  }
}
`

export const SET_BORN = gql`
mutation Mutation(
    $name: String!, 
    $setBornTo: Int! ) {
    editAuthor(
        name: $name, 
        setBornTo: $setBornTo) {
        name
        born
        bookCount
      
    }
  }
`