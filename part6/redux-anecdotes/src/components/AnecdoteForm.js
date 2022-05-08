import { useDispatch } from 'react-redux'
import { postAnecdote } from '../reducers/anecdoteReducer'
import { removeNotif, sendNotification } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        const newAnec = await anecdoteService.postNew(content)
        dispatch(postAnecdote(newAnec))

        dispatch(sendNotification(content))
        setTimeout(() => {
            dispatch(removeNotif())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm