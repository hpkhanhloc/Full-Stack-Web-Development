import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notiReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    props.setNotification(`A new blog ${title.value} by ${author.value} added`,5000)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, {setNotification, createBlog})(NewBlog)