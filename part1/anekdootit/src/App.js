import React, { useState } from 'react'


const Header = ({ header }) => <h1>{header}</h1>

const Btn = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Votes = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        has {props.value} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(Array(anecdotes.length).fill(0))

  const VoteUp = () => {
    const current = [...point];
    current[selected] += 1;
    setPoint(current);
  }

  const Best = (props) => {
    console.log("best", props)
    var x = 0
    props.amount.forEach(element => {
      if (element > x) {
        x = element
      }
    })
    if (x > 1) {
      return (
        <div>
          <p>
            {anecdotes[point.indexOf(x)]}
          </p>
          <p>
            has {x} votes
          </p>
        </div>
      )
    }
    else {
      return (
        <p>No votes yet!</p>
      )
    }
  }

  return (
    <div>
      <Header header="Anectode of the day" />
      <p>{anecdotes[selected]}</p>
      <Votes value={point[selected]} />
      <Btn onClick={() => setSelected(Math.floor(Math.random() * 7))} text="next anecdote" />
      <Btn onClick={VoteUp} text="vote" />
      <Header header="Anecdote with most votes" />
      <Best amount={point} />
    </div>
  )
}

export default App