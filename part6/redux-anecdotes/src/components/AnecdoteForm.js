import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const newStory = async (event) => {
        event.preventDefault()
        const content = event.target.story.value
        event.target.story.value = ''
        props.addAnecdote(content)
    }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={newStory}>
            <div><input name='story'/></div>
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default connect(null, { addAnecdote })(AnecdoteForm)