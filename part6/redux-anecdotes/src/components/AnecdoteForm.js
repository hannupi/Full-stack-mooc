import { connect, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotif, sendNotification } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch() 6.20

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""

        props.createAnecdote(content)
        props.setNotification(`You added "${content}"`, 5)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)