const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'LocHoang'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = `mongodb+srv://fullstack:col1993@cluster0-dceqw.mongodb.net/graphql?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, { useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
     title: String!
     author: Author!
     published: Int!
     genres: [String!]
     id: ID!
  }
  
  type Author {
      name: String!
      born: Int
      bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(title: String!): Book
    me: User
  }

  type Mutation {
      addBook (
          title: String!
          author: String!
          published: Int!
          genres: [String!]
      ): Book

      addAuthor (
          name: String!
          born: Int
      ): Author

      editAuthor (
          name: String!
          setBornTo: Int!
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      
      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        if (!args.author && ! args.genre){
            return await Book.find({}).populate('author', {name: 1, born: 1})
        } /*else if (args.author && !args.genre){
            return books.filter(b => b.author === args.author)
        }*/ else if (!args.author && args.genre){
            return Book.find({genres: {$in: [args.genre]}})
        }/* else if (args.author && args.genre){
            return books.filter(b => b.author === args.author).filter(b => b.genres.includes(args.genre))
        }*/
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Book: {
    title: (root) => root.title,
    author: (root) => root.author,
    published: (root) => root.published,
    genres: (root) => root.genres
  },

  Author: {
      name: (root) => root.name,
      born: (root) => root.born,
      bookCount: async (root, args, context) => {
          const books = await Book.find({}).populate('author', {name: 1})
          const author = books.filter(b => b.author.name === root.name)
          return author.length
      }
  },

  Mutation: {
      addAuthor: (root, args) => {
          const author = new Author({ ...args })

          try {
            author.save()
          } catch (error) {
            throw new UserInputError(error.message, {invalidArgs: args})
          }
          return author
      },

      addBook: async (root, args, context) => {
          const checkAuthor = await Author.findOne({"name": args.author}, {_id: 1})
          const book = new Book({ ... args, author: checkAuthor._id})
          const currentUser = context.currentUser

          if (!currentUser) {
            throw new AuthenticationError("not authenticated")
          }

          try {
              await book.save()
          } catch (error) {
              throw new UserInputError(error.message, {invalidArgs: args})
          }

          pubsub.publish('BOOK_ADDED', { bookAdded: book})
          return await book.populate('author', {name: 1, born: 1})
          },

      editAuthor: (root, args, context) => {
          const author = Author.find({name: {$in: [args.name]}})
          const currentUser = context.currentUser

          if (!currentUser) {
            throw new AuthenticationError("not authenticated")
          } else if (!author) {
              return null
          } else {
              const edittedauthor = Author.findOneAndUpdate({"name": args.name}, {$set: {"born": args.setBornTo}})
              return edittedauthor
          }
      },

      createUser: (root, args) => {
        const user = new User({...args})

        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },

      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'secret') {
          throw new UserInputError('wrong credentials')
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET)}
      }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith(`bearer `)) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return {
        currentUser,
      }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subsription ready at ${subscriptionsUrl}`)
})