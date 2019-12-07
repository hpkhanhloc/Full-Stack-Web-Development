import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(10).fill(0))
  console.log(selected)
  console.log(votes)
  console.log('points', votes[selected])

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVote(newVotes)
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <Anecdote selected={selected} />
      <DisplayVote vote={votes[selected]} />
      <Button onClick={handleVoteClick} text='Vote' />
      <Button onClick={() => setSelected(Math.floor(Math.random()*9+1))} text='Next anecdote' />
      <h1>Anecdote with most votes</h1>
      <MostVote votes={votes}/>
    </div>
  )
}
const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button> 
)
const Anecdote = ({selected}) => <div>{anecdotes[selected]}</div>

const DisplayVote = ({vote}) => <div>Has {vote} votes.</div>

const MostVote = ({votes}) => {
    let mostvote = Math.max(...votes)
    return(
        <div>
            <Anecdote selected={votes.indexOf(mostvote)} />
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Adding manpower to a late software project makes it later!',
  'The best way to get a project done faster is to start sooner',
  'The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.',
  'Plan to throw one (implementation) away; you will, anyhow.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)