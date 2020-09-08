import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'react-thunk';

import blogReducer from './reducer/blogReducer';

const reducer = combineReducers({
  blogs: blogReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;