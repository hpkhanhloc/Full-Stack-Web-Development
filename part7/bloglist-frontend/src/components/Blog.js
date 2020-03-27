import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogs'

const Comments = ({ comments, handleComment }) => {

    const addComment = (event) => {
        event.preventDefault()
        const content = event.target.comment.value
        event.target.comment.value = ''
        handleComment(content)
    }

    return (
        <div class="container">
            <h3>Comments</h3>
            <form class="form-inline" onSubmit={addComment}>
                    <input
                        class="form-control"
                        name="comment" 
                    />
                <button class="btn btn-primary btn-sm" type="submit">Add comment</button>
            </form>
            <div>
                <ul class="list-group">
                    {comments.map((c, i) =>
                        <li class="list-group-item" key={i}>{c}</li>
                    )}
                </ul>
            </div>
            
        </div>
    )
}

const Blog = () => {
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(b => b.id === id))
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    if (!blog) {
        return null
    }

    const own = user && user.username === blog.user.username

    const handleLike = () => {
        dispatch(likeBlog(blog))
    }

    const handleRemove = () => {
        const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (ok) {
            dispatch(removeBlog(id))
            history.push('/')
        }
    }

    const handleComment = (comment) => {
        dispatch(commentBlog(id, comment))
    }

    return (
        <div class='container'>
            <h3>{blog.title} by {blog.author}</h3>
            <div>
                <div><a href={blog.url}>{blog.url}</a></div>
                <div>likes {blog.likes}
                    <button class="btn btn-primary btn-sm" onClick={handleLike}>Like!</button>
                    {own && <button class="btn btn-danger btn-sm" onClick={handleRemove}>Remove</button>}
                </div>
                <div>Added by {blog.user.username}</div>
            </div>
            <Comments
                comments={blog.comments}
                handleComment={handleComment}
            /> 
        </div>
        
    )
}

export default Blog