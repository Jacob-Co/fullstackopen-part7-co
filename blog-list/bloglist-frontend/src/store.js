import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import blogReducer from './reducer/blogReducer';
import userReducer from './reducer/userReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;