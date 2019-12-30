const notiReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIVOTE':
            return action.message
        case 'CLEARNOTI':
            return ''
        default:
            return state
    }
}


export const setnotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIVOTE',
            message,
        })
        setTimeout(() => dispatch({
            type: 'CLEARNOTI'
        }),time*1000)
    }
  }


export default notiReducer