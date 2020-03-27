import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs";
import Users from "./components/Users"
import Notification from "./components/Notification";

import { logout } from "./reducers/user"
import { initializeBlogs } from "./reducers/blogs"
import { initializeUsers } from "./reducers/users"
import { 
  BrowserRouter as Router,
  Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
import { createBlog } from "./reducers/blogs";
import Blog from "./components/Blog";
import User from './components/User'
import { Navbar, Button, Nav } from "react-bootstrap";

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const newBlogRef = React.createRef();

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch]);

  // const handleCreateBlog = useCallback(
  //   () => dispatch(createBlog()), [dispatch])

  if (user === null) {
    return (
      <LoginForm />
    )
  }

  const padding = { padding: 5}

  return (
    <div className='container'>
      <Router>
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user.name} logged in  
              </Nav.Link>
              <Button variant="primary" onClick={() => dispatch(logout())}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Notification />
        <Togglable buttonLabel="create new" ref={newBlogRef}>
          <NewBlog createBlog={(newblog) => dispatch(createBlog(newblog))} />
        </Togglable>
        <div>
          <Route exact path="/" render={() => <Blogs />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/blogs/:id" render={() => <Blog />} />
          <Route exact path="/users/:id" render={() => <User />} />
        </div>
      </Router>
    </div>
  );

}

export default App