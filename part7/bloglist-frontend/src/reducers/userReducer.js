import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'LOGGED':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return state
    }

}

export const login = (username, password) => {
    event.preventDefault()
    return async dispatch => {
        const user = await loginService.login({
            username,
            password
        })
        console.log(user)

        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            user,
        })
    }
}

export const handleLogout = () => {
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    return dispatch => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const handleLogged = () => {
    const result = localStorage.getItem('loggedBlogAppUser')
    if (result !== null) {
        const user = JSON.parse(result)
        blogService.setToken(user.token)
        return dispatch => {
            dispatch({type: 'LOGGED',
            user,
        })
        }
    }
}

export default userReducer