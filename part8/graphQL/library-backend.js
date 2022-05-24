require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const Author = require("./models/author")
const Book = require("./models/book")
const mongoose = require('mongoose')

console.log("connecting", process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]
      allAuthors: [Author]
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!, 
            setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            console.log("args", args)
            const author = await Author.findOne({ name: args.author })

            var filteredBooks = await Book.find({})
            if (args.author) {
                filteredBooks = await Book.find({ author: author._id })
            }
            // No new query to save previous state
            if (args.genre) {
                filteredBooks = filteredBooks.filter(book => book.genres.find(genre => genre === args.genre))
            }
            return filteredBooks
        },
        allAuthors: async () => {
            const books = await Book.find()
            return Author.find({})
        },
    },
    Author: {
        bookCount: async (root) => {
            // Find current author
            const targetAuthor = await Author.findOne({ name: root.name })
            // Match based off of ID
            const books = await Book.find({ author: targetAuthor.id })
            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            var author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({ name: args.author })
            }
            const book = new Book({ ...args, author })
            author.save()
            return book.save()
        },
        editAuthor: async (root, args) => {

            console.log("args", args)
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            return author.save()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})