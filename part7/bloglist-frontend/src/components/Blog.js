import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Blog = ({ blog, like, remove, creator }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Details = ({blog}) => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {creator &&(<button onClick={() => remove(blog)}>remove</button>)}
    </div>
  )

  

  return (
    <div style={blogStyle}>
      <Router>
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
        <div>
        <Route exact path="/blogs/:id" render={() => <Details blog={blog}/> }/>
        </div> 
      </Router>
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  creator: PropTypes.bool.isRequired
}

export default Blog