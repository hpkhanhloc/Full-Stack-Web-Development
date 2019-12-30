import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notiReducer'

const AnecdoteList = (props) => {
    console.log(props.anecdotes)
    console.log(props.filter)
    console.log(props.notification)

    const handleClick = (anecdote) => {
      return async dispatch => {
        props.vote(anecdote)
        props.setnotification(`You has voted ${anecdote.content}`, 10)
      }
    }

    return(
        <div>
        {props.anecdoteToShow.sort((a,b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={handleClick(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

const mapDispatchToProps = {
  vote,
  setnotification
}

const anecdoteToShow = ({ anecdotes, filter }) => {
  if ( filter === 'ALL' ) {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.toLowerCase().match(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdoteToShow: anecdoteToShow(state),
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdotes