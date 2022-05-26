import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'


const Login = ({ setToken, show }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("userToken", token)
        }
    }, [result.data]) // eslint-disable-line

    if (!{ show }) {
        return null
    }



    const submit = async (e) => {
        e.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <div>
            <br></br>
            <form onSubmit={submit}>
                <div>
                    <label>username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>password</label>
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type='submit' >Login</button>
            </form>
        </div>
    )
}

export default Login