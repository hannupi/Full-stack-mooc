import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (anecdote) => {
        dispatch(votedAnecdote(anecdote))

        dispatch(setNotification(`You upvoted "${anecdote.content}"`, 5))
    }

    const anecdotesFiltered = anecdotes.filter(anec => anec.content.includes(filter))

    return (
        < div >
            < h2 > Anecdotes</h2>
            {
                anecdotesFiltered.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}

                            <button onClick={() => vote(anecdote)}>
                                vote
                            </button>

                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default AnecdoteList