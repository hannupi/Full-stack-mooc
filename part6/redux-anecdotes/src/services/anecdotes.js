import axios from "axios"

const url = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(url)
    return res.data
}

const postNew = async (anecdote) => {
    const obj = {
        content: anecdote,
        votes: 0
    }
    const res = await axios.post(url, obj)
    return res.data
}

export default { getAll, postNew }