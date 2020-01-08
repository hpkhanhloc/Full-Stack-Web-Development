import React, { useState } from 'react'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {
        e.preventDefault()

        const result = await props.login({
            variables: { username, password }
        })

        console.log(result)

        if (result) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('loggedUserToken', token)
        }
    }
    
    if(!props.show){
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                    value={password}
                    type='password'
                    onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm