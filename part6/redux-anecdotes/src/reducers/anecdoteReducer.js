


export const voteUp = (id) => {
  return {
    type: "VOTE",
    id: id
  }
}

export const postAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    content
  }
}

export const setAnecdotes = (content) => {
  return {
    type: "SET_ANECDOTES",
    content
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

    case "VOTE":
      const id = action.id
      const targetAnecdote = state.find(anec => anec.id === id)
      const changedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }
      return state.map(anec => anec.id !== id ? anec : changedAnecdote).sort((a, b) => b.votes - a.votes)
    case "NEW_ANECDOTE":
      return [...state, action.content]
    case "SET_ANECDOTES":
      return action.content.map(anec => anec)

    default: return state
  }
}

export default reducer