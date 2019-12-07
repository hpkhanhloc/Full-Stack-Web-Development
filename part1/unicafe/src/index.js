import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Content text='Give Feedback'/>
      <Button onClick={() => setGood(good+1)} text='Good' />
      <Button onClick={() => setNeutral(neutral+1)} text='Neutral' />
      <Button onClick={() => setBad(bad+1)} text='Bad' />
      <Content text='Statistics' />
      <History good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
const Content = (props) => <h1>{props.text}</h1>

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Display = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
    let sum = good + neutral + bad
    return (
        <table>
            <tbody>
                <Display text='Good' value={good} />
                <Display text='Neutral' value={neutral} />
                <Display text='Bad' value={bad} />
                <Display text='All' value={sum} />
                <Display text='Average' value={(good - bad)/sum} />
                <Display text='Positive' value={good/sum*100 + ' %'} />
            </tbody>
        </table>
    )
}

const History = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <>
                No feedback given
            </>
        )
    }
    return (
        <div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)