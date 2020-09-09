import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducer/userReducer';

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login({username, password}))
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
