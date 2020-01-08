import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation, useApolloClient, useSubscription } from 'react-apollo'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`


const ALL_AUTHORS = gql`
  {
  allAuthors {
    name
    born
    bookCount
  }
}
`
const ALL_BOOKS = gql`
  {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const ME = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [authors, setAuthors] = useState('')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [books, setBooks] = useState('')

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includeIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery( { query: ALL_BOOKS })
    if (!includeIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded 
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const errorNotification = () => errorMessage &&
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>

  if (!token) {
    return (
      <div>
        {errorNotification()}
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
      <Query query={ALL_AUTHORS}>
        {(result) => {
          if (result.loading){
            return <div>Loading...</div>
          }
          setAuthors(result.data.allAuthors)
          return (
            <Authors show={page === 'authors'} authors={result.data.allAuthors}/>
          )
        }}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => {
          if (result.loading){
            return <div>Loading...</div>
          }
          setBooks(result.data.allBooks)
          return (
            <Books show={page === 'books'} books={result.data.allBooks}/>
          )
        }}
      </Query>
        
      <Mutation mutation={LOGIN} onError={handleError}>
        {(login) => <LoginForm show={page === 'login'} login={login} setToken={(token) => setToken(token)}/>}
      </Mutation>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendation')}>Recommendation</button>
        <button onClick={logout}>logout</button>
      </div>
      <Query query={ALL_AUTHORS}>
        {(result) => {
          if (result.loading){
            return <div>Loading...</div>
          }
          setAuthors(result.data.allAuthors)
          return (
            <Authors show={page === 'authors'} authors={result.data.allAuthors}/>
          )
        }}
      </Query>
      <Mutation mutation={EDIT_AUTHOR} refetchQueries={[{query: ALL_AUTHORS}]}>
        {(editAuthor) => <EditAuthor show={page === 'authors'} editAuthor={editAuthor} authors={authors}/>}
      </Mutation>

      <Query query={ALL_BOOKS}>
        {(result) => {
          if (result.loading){
            return <div>Loading...</div>
          }
          setBooks(result.data.allBooks)
          return (
            <Books show={page === 'books'} books={result.data.allBooks}/>
          )
        }}
      </Query>

      <Mutation mutation={ADD_BOOK} onError={handleError}
        update={(store, response) => {updateCacheWith(response.data.addBook)}}
        refetchQueries={[{query: ALL_BOOKS}, {query: ALL_AUTHORS}]}>
        {(addBook) => <NewBook show={page === 'add'} addBook={addBook}/>}
      </Mutation>

      <Query query={ME}>
        {(result) => {
          if (result.loading){
            return <div>Loading...</div>
          }
          return (
            <Recommendation show={page === 'recommendation'} me={result.data.me} books={books}/>
          )
        }}
      </Query>

    </div>
  )
}

export default App