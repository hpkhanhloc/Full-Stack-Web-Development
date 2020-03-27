import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs";
import Users from "./components/Users"
import Notification from "./components/Notification";

import { logout, login } from "./reducers/user"
import { initializeBlogs } from "./reducers/blogs"
import { initializeUsers } from "./reducers/users"
import { 
  BrowserRouter as Router,
  Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
import { createBlog } from "./reducers/blogs";
import Blog from "./components/Blog";
import User from './components/User'
import { Navbar, Button, Nav } from "react-bootstrap";
import storage from "./utils/storage";
import { setNotification } from "./reducers/notification";

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const newBlogRef = React.createRef();

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const user = storage.loadUser()
    if (user) { dispatch(login(user))}
  }, [dispatch]);

  const handleCreateBlog = async (blog) => {
    dispatch(createBlog(blog))
    dispatch(setNotification(`A new blog: ${blog.title} by ${blog.author} added`))
  }
  
  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

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
              <Button variant="primary" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Notification />
        
        <Switch>
          <Route exact path="/">
            <Togglable buttonLabel="create new" ref={newBlogRef}>
              <NewBlog createBlog={handleCreateBlog} />
            </Togglable>
            <Blogs />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route> />
          <Route exact path="/blogs/:id">
            <Blog />
          </Route> 
          <Route exact path="/users/:id">
            <User />
          </Route>
        </Switch>
      </Router>
    </div>
  );

}

export default App