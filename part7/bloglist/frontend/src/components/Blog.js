import React from "react"
import Toggle from "./Toggle"

import { Button, Container, } from 'react-bootstrap'

const Blog = ({ blog, updateLikes, remove }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem("loggedUser"))

  const addLike = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }
    updateLikes(blog.id, blogObject)
  }

  const deleteBlog = () => {
    if (window.confirm(`Delete blog ${blog.title} ?`)) {
      remove(blog.id)
    }
  }

  const DeleteButton = () => {
    if (loggedInUser) {
      if (blog.user.username === loggedInUser.username) {
        return (
          <Button size="sm" variant="danger" onClick={deleteBlog}>Delete</Button>
        )
      }
    }
    return null

  }

  return (
    <div className="blog pb-1">
      <Container>
        <div className="bg- rounded">
          <div className="blogEntry">
            {blog.title} {blog.author}
          </div>
          <Toggle label="View">
            <p>
              {blog.url}
            </p>
            <p>
              Likes: {blog.likes} <Button variant="success" size="sm" onClick={addLike}>Like</Button>
            </p>
            <p>
              {blog.user.username}
            </p>
            <DeleteButton />
          </Toggle>
        </div>
      </Container>
      <br></br>
    </div>


  )
}

export default Blog
