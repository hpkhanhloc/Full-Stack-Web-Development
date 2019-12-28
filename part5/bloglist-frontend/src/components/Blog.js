import React, { useState }  from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showDelButton = { display: blog.user.id === user.id ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} likes
          <button onClick={handleLike}>Like</button>
        </div>
        <div>added by {blog.user.name}</div>
        <div><button onClick={toggleVisibility}>Hide</button>
          <button style={showDelButton} onClick={handleDelete}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog