require('dotenv').config()
const { UserInputError } = require("apollo-server");
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const author = await Author.findOne({ name: args.author })

            var filteredBooks = await Book.find({}).populate("author")
            if (args.author) {
                filteredBooks = await Book.find({ author: author._id }).populate("author")
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
        me: (root, args, context) => {
            return context.currentUser
        }
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
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError("Log in before adding a book")
            }
            if (await Book.findOne({ title: args.title })) {
                throw new UserInputError("Book already exists with this title!", {
                    invalidArgs: args
                })
            }

            try {
                var author = await Author.findOne({ name: args.author })
                if (!author) {
                    author = new Author({ name: args.author })
                }
                // await author.save or crashes
                await author.save()
                book = new Book({ ...args, author })
                pubsub.publish("BOOK_ADDED", { bookAdded: book })
                return book.save()
            }
            catch (err) {
                throw new UserInputError(err.message, {
                    invalidArgs: args
                })
            }
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError("Log in before editing authors")
            }

            const author = await Author.findOne({ name: args.name })
            if (!author) {
                throw new UserInputError("Author with that name does not exist")
            }
            try {
                author.born = args.setBornTo
                return author.save()
            }
            catch (err) {
                throw new UserInputError(err.message, {
                    invalidArgs: args
                })
            }
        },
        createUser: async (root, args) => {
            const user = await User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(err => {
                    throw new UserInputError(err.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            // Hardcoded password for the moment
            if (!user || args.password !== "asd") {
                throw new UserInputError("Wrong password")
            }

            const userToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userToken, process.env.SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
        }
    }
}

module.exports = resolvers