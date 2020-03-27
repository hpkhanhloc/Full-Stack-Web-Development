import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
// import Togglable from "./Togglable";
// import NewBlog from "./NewBlog";
// import { createBlog } from "../reducers/blogs"

const Blogs = () => {
    //const dispatch = useDispatch
    //const newBlogRef = React.createRef();
    const blogs = useSelector(state => state.blogs)
        .sort((b1, b2) => b2.likes - b1.likes)

    return (
      <div>
        <h2>Blogs</h2>
        <Table striped>
          <tbody>
            {blogs.map(blog => 
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
                <td>
                  {blog.user.name}
                </td>
                </tr>
            )} 
          </tbody>
        </Table>
      </div>
    );
}

export default Blogs