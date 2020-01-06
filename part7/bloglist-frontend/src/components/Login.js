import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useField } from '../hooks' 

const Login = (props) => {
    const [username] = useField('text')
    const [password] = useField('password')   
    
    const handleLogin = (event) => {
      event.preventDefault()
      props.login(username.value, password.value )
    }

    return(
        <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input {...username}/>
          </div>
          <div>
            Password
            <input {...password} />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: state.blogs,
    }
}


export default connect( mapStateToProps, {login} )(Login)