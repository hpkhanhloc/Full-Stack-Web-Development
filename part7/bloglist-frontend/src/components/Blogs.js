import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notiReducer'

const Blogs = (props) => {

    const likeBlog = (blog) => {
        props.likeBlog(blog)
        props.setNotification(`You has liked ${blog.title}`, 5000)
    }

    const removeBlog = (blog) => {
        const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (ok) { 
            props.removeBlog(blog)
            props.setNotification(`Blog ${blog.title} by ${blog.author} removed`, 5000)
        }
    }
    return(
        props.blogs.map(blog => 
            <Blog 
            key={blog.id}
            blog={blog}
            like={likeBlog}
            remove={removeBlog}
            user={blog.user}
            creator={blog.user.username === props.user.username}
            />)
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    likeBlog, removeBlog, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)