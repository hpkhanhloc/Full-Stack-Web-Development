const notiReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTI':
            return action.message
        case 'CLEARNOTI':
            return null
        default: 
            return state
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'NOTI',
            message,
        })
        setTimeout(() => dispatch({
            type: 'CLEARNOTI'
        }), time)
    }
}

export default notiReducer