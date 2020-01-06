import React, { useEffect } from 'react'
import Blogs from './Blogs'
import { connect } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { handleLogged , handleLogout } from '../reducers/userReducer'
import { createBlog } from '../reducers/blogReducer'
import NewBlog from './NewBlog'
import Notification from './Notification'
import Togglable from './Togglable'
import Login from './Login'

const Home = (props) => {
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
          props.handleLogged(loggedUserJSON)
        }
        props.initializeBlogs()
      }, [])
    
      if (props.user === null) {
        return (
          <Login />
        )
      }

      const newBlogRef = React.createRef()

      return (
        <div>
        <h2>Blogs</h2>
        <Notification />
        <Togglable buttonLabel='create new' ref={newBlogRef}>
          <NewBlog />
        </Togglable>
        <Blogs />
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
      blogs: state.blogs,
      user: state.user,
    }
  }
  
const mapDispatchToProps = {
    initializeBlogs, createBlog, handleLogout, handleLogged
}
  
export default connect(mapStateToProps , mapDispatchToProps)(Home)