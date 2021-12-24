import React, { useState } from 'react'

const StatisticLine = props => {
  return(
    <tr>
      <td>
        {props.text}
      </td>
      <td>
      {props.value}
      </td>
    </tr>
  )
}

const Header = ({title}) => <h1>{title}</h1>

const Button = ({onClick, text}) =>  {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good+bad*-1)/total
  const pos = good/total * 100

  if (total > 0) {
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={pos + " %"}/>
          </tbody>
      </table>
    )

  }
  else {
    return(
      <div>
        No feedback given
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="give feedback"/>
      <Button onClick={() => setGood(good+1) } text="good"/> 
      <Button onClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button onClick={() => setBad(bad+1)} text="bad"/>

      <Header title="stats"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

      
    </div>
  )
}

export default App