import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import blogReducer from './reducer/blogReducer';
import tokenReducer from './reducer/tokenReducer';
import notificationReducer from './reducer/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  token: tokenReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;