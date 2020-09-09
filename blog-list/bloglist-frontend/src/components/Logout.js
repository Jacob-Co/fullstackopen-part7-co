import React from 'react';
import { useDispatch } from 'react-redux'

import { logout } from '../reducer/userReducer';

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(logout())}>logout</button>
  )
}

export default Logout;