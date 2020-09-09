import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from '../reducer/notificationReducer';

const localStorageKey = 'localBlogAppUser'

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      window.localStorage.setItem( localStorageKey, JSON.stringify(user));
      dispatch({
        type: 'LOGIN',
        data: user
      });
      dispatch(createNotification(`Welcome ${user.name}`, 'success'))
    } catch {
      dispatch(createNotification('Wrong credentials', 'warning'));
    }
  };
}

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(localStorageKey);
    dispatch({
      type: 'LOGOUT'
    })
    dispatch(createNotification('Logged out', 'warning'));
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
}

export default userReducer;