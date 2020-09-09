import loginService from '../services/login'

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('localBlogAppUser', JSON.stringify(user));
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

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
}

export default userReducer;