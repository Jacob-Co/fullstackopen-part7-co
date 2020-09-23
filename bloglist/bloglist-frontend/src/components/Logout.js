import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logout } from '../reducer/tokenReducer';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Logout;