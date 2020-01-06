import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notiReducer from './reducers/notiReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notiReducer,
  user: userReducer,
  userlist: userListReducer,
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store