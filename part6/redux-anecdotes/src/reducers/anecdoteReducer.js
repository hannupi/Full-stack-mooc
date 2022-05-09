import anecdoteService from "../services/anecdotes"


export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnec = await anecdoteService.postNew(anecdote)
    dispatch(postAnecdote(newAnec))
  }
}

export const votedAnecdote = anecdote => {
  return async dispatch => {
    const anecdotes = await anecdoteService.voteAnecdote(anecdote)
    dispatch(voteUp(anecdotes.id))
  }
}

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
      const anecdotesMapped = action.content.map(anec => anec)
      return anecdotesMapped

    default: return state
  }
}

export default reducer