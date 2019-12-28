import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Togglabel from './components/Togglabel'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username] = useField('text')
  const [password] = useField('password')
  const [newtitle, setTitle] = useState('')
  const [newauthor, setAuthor] = useState('')
  const [newurl, setURL] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value , password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setSuccessMessage(`${user.name} log in successful`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    } catch (error) {
      setErrorMessage('wrong user name or password')
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setSuccessMessage(`${user.name} logged out successful`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
      setUser(null)
    } catch (error) {
      setErrorMessage(`${error.response.data}`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(n => n.id === id)
    const updateblog = await blogService.update(id, {
      'user': blog.user._id,
      'likes': blog.likes + 1,
      'author': blog.author,
      'title': blog.title,
      'url': blog.url
    })
    setBlogs(blogs.map(n => n.id !== id ? n : updateblog))
  }

  const handleDelete = async (id) => {
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
      await blogService.del(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        'title': newtitle,
        'author': newauthor,
        'url': newurl
      })
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`A new blog: ${newtitle} by ${newauthor} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (error) {
      setErrorMessage(`${error.response.data}`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }
  }

  const CreatBlogForm = () => {
    return (
      <div>
        <Togglabel buttonLabel='New Blog'>
          <AddBlogForm
            newtitle = {newtitle}
            newauthor = {newauthor}
            newurl = {newurl}
            handleCreate = {handleCreate}
            setAuthor = {setAuthor}
            setTitle = {setTitle}
            setURL = {setURL}
          />
        </Togglabel>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification message={successMessage} />
        <ErrorNotification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
        username<input
              {...username}
            />
          </div>
          <div>
        password<input {...password}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <form onSubmit={handleLogout}>
        <p>{user.name} logged in<button type='submit'>logout</button></p>
      </form>
      <CreatBlogForm />
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={() => handleLike(blog.id)} handleDelete={() => handleDelete(blog.id)} />
        )}
      </div>
    </div>
  )
}
export default App
