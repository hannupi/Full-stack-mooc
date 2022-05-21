import { useState } from "react"

import { Button, Form, } from 'react-bootstrap'

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

            <Form onSubmit={sendBlog}>

                <div>
                    <Form.Label>Title</Form.Label>
                    <Form.Control size="sm" placeholder="Sample title" type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} title="title" />
                </div>
                <div>
                    <Form.Label>Author</Form.Label>
                    <Form.Control size="sm" placeholder="Sample author" type="text" value={author} name="author" onChange={e => setAuthor(e.target.value)} title="author" />
                </div>
                <div>
                    <Form.Label>URL</Form.Label>
                    <Form.Control size="sm" placeholder="Sample URL" type="text" value={url} name="url" onChange={e => setUrl(e.target.value)} title="url" />
                </div>
                <Button variant="success" size="sm" id="submitButton" type="submit">Create</Button>

            </Form>
        </div >
    )
}

export default BlogForm