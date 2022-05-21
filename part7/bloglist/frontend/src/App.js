import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import userService from "./services/users"
import Infomessage from "./components/Notification"
import Toggle from "./components/Toggle"
import BlogForm from "./components/BlogForm"
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom"


import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Navbar, Form } from 'react-bootstrap'
import "./index.css"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const [users, setUsers] = useState([])


	useEffect(() => {
		blogService.getAll()
			.then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		userService.getUsers()
			.then((users) => setUsers(users))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const Menu = () => {
		return (
			<div>
				<Navbar className="my-3 bg-primary"  >
					<Button className="navbarButton" variant="info">
						<Link to="/" >Blogs</Link>
					</Button>
					<Button className="navbarButton " variant="info">
						<Link to="/users">Users</Link>
					</Button>

					<Container className="justify-content-end " >
						<Button variant="danger" className="" size="sm" onClick={logoutAndRefresh}>Log out</Button>

						<Navbar.Text className="mx-3 text-white" >
							Logged in as: {user.username}
						</Navbar.Text>
					</Container>
				</Navbar>


			</div>
		)
	}

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
			<Container className="mt-5">
				<h2>Login</h2>
				<Form onSubmit={submitLogin}>
					<div>
						<Form.Label>Username</Form.Label>
						<Form.Control size="sm" type="text" id="username" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
					</div>
					<div>
						<Form.Label>Password</Form.Label>
						<Form.Control size="sm" type="password" id="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
					</div>
					<br></br>
					<Button type="submit" id="loginButton">Login</Button>
				</Form>
			</Container>
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
			<div className="mt-4">
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

	const Users = () => {
		return (
			<div>
				<h2>Users and amount of created blogs</h2>
				{users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
					<div key={user.id}>
						<Link to={`/users/${user.id}`}>{user.username}</Link> - {user.blogs.length}
					</div>
				)}
			</div>
		)
	}

	const User = () => {
		const id = useParams().id
		const user = users.find(user => user.id === id)

		if (!user) {
			return null
		}
		return (
			<div>
				<h2>User: {user.username}</h2>
				<br></br>
				<h3>Added blogs</h3>
				{user.blogs.map(blog => <li key={blog.id}> {blog.title} </li>)}
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
		<Router>
			<Container className="p-3">
				<Menu />
				<Routes>
					<Route path="/" element={<>
						<Infomessage message={message} />
						<h2>Create a new blog</h2>

						<Toggle label={"New blog"} >
							<BlogForm createBlog={sendBlog} />
						</Toggle>
						<BlogsList />
					</>} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/:id" element={<User />} />
				</Routes>
			</Container>
		</Router>
	)
}

export default App
