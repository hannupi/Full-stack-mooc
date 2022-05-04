import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const sendBlog = e => {
        e.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle("")
        setAuthor("")
        setUrl("")
    }
    return (
        < div >
            <h2>Create a new blog</h2>
            <form onSubmit={sendBlog}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} title="title" />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" value={author} name="author" onChange={e => setAuthor(e.target.value)} title="author" />
                </div>
                <div>
                    <label>URL:</label>
                    <input type="text" value={url} name="url" onChange={e => setUrl(e.target.value)} title="url" />
                </div>
                <button id="submitButton" type="submit">Create</button>

            </form>
        </div >
    )
}

export default BlogForm