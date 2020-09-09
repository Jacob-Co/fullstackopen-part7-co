import loginService from '../services/login'

const localStorageKey = 'localBlogAppUser'

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem( localStorageKey, JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      data: user
    });
  };
}

export const setUser = (user) => {
  return async (dispatch) => {
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