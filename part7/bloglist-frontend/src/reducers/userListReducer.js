import userService from '../services/users'

const userListReducer = (state =[], action) => {
    switch(action.type){
        case 'INIT':
            return action.userlist
        case 'FIND':
            return action.data
        default:
            return state
    }
}

export const initializeUserList = () => {
    return async dispatch => {
        const userlist = await userService.getAll()
        dispatch({
            type: 'INIT',
            userlist
        })
    }
}

export const findUser = (id) => {
    return async dispatch => {
        const user = await userService.findById(id)
        dispatch({
            type: 'FIND',
            user
        })
    }
}

export default userListReducer