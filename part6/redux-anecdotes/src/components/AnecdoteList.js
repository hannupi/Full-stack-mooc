import { useSelector, useDispatch } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'
import { removeNotif, sendNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (anecdote) => {
        dispatch(voteUp(anecdote.id))
        dispatch(sendNotification(anecdote.content))
        setTimeout(() => {
            dispatch(removeNotif())
        }, 5000)
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