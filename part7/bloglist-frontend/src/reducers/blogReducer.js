import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_BLOG':
            return state.concat(action.data).sort(byLikes)
        case 'INIT_BLOGS':
            return action.data.sort(byLikes)
        case 'LIKE_BLOG':
            const blog = state.find(b => b.id === action.data)
            const likedblog = {...blog, likes: blog.likes + 1}
            return state.map(b => b.id !== action.data ? b : likedblog).sort(byLikes)
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data).sort(byLikes)
        default:
            return state.sort(byLikes)
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        })
    }
}

export const likeBlog = blog => {
    const likedBlog = { ...blog, likes: blog.likes +1}
    return async dispatch => {
        const updatedBlog = await blogService.update(likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog.id
        })
    }
}

export const removeBlog = blog => {
    return async dispatch => {
        const updatedBlog = await blogService.remove(blog)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog.id
        })
    }
}

export default blogReducer