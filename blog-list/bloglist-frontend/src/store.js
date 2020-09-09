import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import blogReducer from './reducer/blogReducer';
import userReducer from './reducer/userReducer';
import notificationReducer from './reducer/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;