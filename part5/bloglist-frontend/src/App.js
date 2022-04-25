import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css"
import Infomessage from "./components/Notification";
import Toggle from "./components/Toggle";


const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	useEffect(() => {
		blogService.getAll()
			.then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])



	const submitLogin = async (e) => {
		e.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});

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

	const sendBlog = e => {
		e.preventDefault()
		const blogObject = {
			title: title,
			author: author,
			url: url
		}

		blogService
			.create(blogObject)
			.then(returned => {
				setBlogs(blogs.concat(returned))
			})
		setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
		setTimeout(() => {
			setMessage(null)
		}, 4000)
		setTitle("")
		setAuthor("")
		setUrl("")
	}

	const BlogForm = () => (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={sendBlog}>
				<div>
					<label>Title:</label>
					<input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div>
					<label>Author:</label>
					<input type="text" value={author} name="author" onChange={e => setAuthor(e.target.value)} />
				</div>
				<div>
					<label>URL:</label>
					<input type="text" value={url} name="url" onChange={e => setUrl(e.target.value)} />
				</div>
				<button type="submit">Create</button>

			</form>
		</div>
	)

	const logoutAndRefresh = () => {
		window.localStorage.clear()
		window.location.reload()
	}

	const BlogsList = () => {
		return (
			<div>
				<h2>blogs</h2>

				{blogs.map((blog) => (<Blog key={blog.id} blog={blog} />))}
			</div>
		)
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
			<span>Logged in as {user.name} </span> <button onClick={logoutAndRefresh}>Log out</button>
			<Toggle label={"New blog"}>
				{BlogForm()}
			</Toggle>
			<BlogsList />
		</div>

	)
}

export default App;
