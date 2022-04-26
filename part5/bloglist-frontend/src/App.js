import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"
import Infomessage from "./components/Notification"
import Toggle from "./components/Toggle"
import BlogForm from "./components/BlogForm"


const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)


	useEffect(() => {
		blogService.getAll()
			.then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])



	const submitLogin = async (e) => {
		e.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem(
				"loggedUser", JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername("")
			setPassword("")
			setMessage("Successful login")
			setTimeout(() => {
				setMessage(null)
			}, 4000)
		}
		catch (err) {
			setMessage("Invalid username or password")
			setTimeout(() => {
				setMessage(null)
			}, 4000)
		}
	}

	const loginForm = () => (
		<div>
			<h2>Login</h2>
			<form onSubmit={submitLogin}>
				<div>
					<p>Username</p>
					<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
				</div>
				<div>
					<p>Password</p>
					<input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
				</div>
				<br></br>
				<button type="submit">Login</button>
			</form>
		</div>
	)


	const sendBlog = (blogObject) => {
		blogService
			.create(blogObject)
			.then(returned => {
				setBlogs(blogs.concat(returned))
			})
		setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
		setTimeout(() => {
			setMessage(null)
		}, 4000)

	}

	const logoutAndRefresh = () => {
		window.localStorage.clear()
		window.location.reload()
	}

	const BlogsList = () => {
		return (
			<div>
				<h2>Blogs</h2>
				{blogs.sort((a, b) => b.likes - a.likes)
					.map((blog) => (<Blog key={blog.id} blog={blog} updateLikes={blogUpdate} remove={deleteBlog} />))}
			</div>
		)
	}

	const blogUpdate = async (id, blogObject) => {
		await blogService.update(id, blogObject)
		setBlogs(blogs.map(blog => {
			if (blog.id === id) {
				blog.likes += 1
			}
			return blog
		}))
	}

	const deleteBlog = async (id) => {
		await blogService.remove(id)

		setBlogs(blogs.filter(blog => blog.id !== id))
	}



	if (user === null) {
		return (
			<div>
				<Infomessage message={message} />
				{loginForm()}
			</div>
		)
	}
	return (
		<div>
			<Infomessage message={message} />
			<span>Logged in as {user.username} </span> <button onClick={logoutAndRefresh}>Log out</button>
			<Toggle label={"New blog"}>
				<BlogForm createBlog={sendBlog} />
			</Toggle>
			<BlogsList />
		</div>

	)
}

export default App
