import React, { useEffect } from 'react'
import Home from './components/Home'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { handleLogout, handleLogged } from './reducers/userReducer'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Login from './components/Login'
import { Container } from 'semantic-ui-react'

const App = (props) => {

  useEffect(() => {
      props.handleLogged()
      props.initializeBlogs()
  }, [])

  if (props.user === null) {
    return (
      <Login />
    )
  }

  const padding = { padding: 5 }
  
  /*{props.user.name} logged in<button onClick={props.handleLogout}>logout</button>*/
  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">Blogs</Link>
          <Link style={padding} to="/users">Users</Link>
          {props.user.name} logged in<button onClick={props.handleLogout}>logout</button>
        </div>
        <div>
          <Route exact path="/" render={() =><Home /> } />
          <Route path="/users" render={() =><Users /> } />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

const mapDispatchToProps = {
  handleLogout, handleLogged, initializeBlogs
}

export default connect(mapStateToProps , mapDispatchToProps)(App)