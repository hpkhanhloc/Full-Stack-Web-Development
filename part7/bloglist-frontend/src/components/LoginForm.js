import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'
import loginService from '../services/login'
import { setNotification } from '../reducers/notification'
import storage from '../utils/storage'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            setUsername('')
            setPassword('')
            dispatch(login(user))
            dispatch(setNotification(`${user.name} welcome back!`))
            storage.saveUser(user)
        } catch (exception) {
            dispatch(setNotification('wrong username/password', 'error'))
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        id='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        id='password'
                        value={password}
                        type='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Button id="login" variant="primary" type="submit">
                        login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginForm