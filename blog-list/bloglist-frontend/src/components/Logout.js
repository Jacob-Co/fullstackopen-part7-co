import React from 'react';
import { useDispatch } from 'react-redux'

import { logout } from '../reducer/userReducer';
import { createNotification } from '../reducer/notificationReducer';

const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(createNotification('Logged out', 'warning'));
    dispatch(logout());
  }

  return (
    <button onClick={handleClick}>logout</button>
  )
}

export default Logout;