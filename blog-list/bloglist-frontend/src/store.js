import { createStore, combineReducers, applyMiddleware } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'react-thunk';

const store = createStore();

export default store;