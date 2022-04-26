import React from "react"
import Toggle from "./Toggle"

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
    if (blog.user.username === loggedInUser.username) {
      return (
        <button onClick={deleteBlog}>Delete</button>
      )
    }
    else {
      return null
    }

  }

  return (
    <div>
      {blog.title} {blog.author}
      <Toggle label="View">
        <p>
          {blog.url}
        </p>
        <p>
          Likes: {blog.likes} <button onClick={addLike}>Like</button>
        </p>
        <p>
          {blog.user.username}
        </p>
        <DeleteButton />
      </Toggle>
    </div>
  )
}

export default Blog
