import { useSelector, useDispatch } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const vote = (anecdote) => {
        dispatch(voteUp(anecdote.id))
        dispatch({ type: "notifications/newNotifications", payload: anecdote.content })
        setTimeout(() => {
            dispatch({ type: "notifications/removeNotifications" })
        }, 5000)
    }

    return (
        < div >
            < h2 > Anecdotes</h2>
            {
                anecdotes.map(anecdote =>
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