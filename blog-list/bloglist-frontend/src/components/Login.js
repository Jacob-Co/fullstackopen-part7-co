import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { login } from '../reducer/tokenReducer';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login({username, password}))
    history.push('/')
  }

  return (
    <div>
      <h2>Log in to Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            name="username"
            autoComplete="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}  

export default Login;
