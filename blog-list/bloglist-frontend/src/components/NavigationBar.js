import React from 'react';
import { Link } from 'react-router-dom'

import Logout from './Logout';

const NavigationBar = ({user}) => {
  return(
    <nav>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user.name} logged in <Logout />
    </nav>
  )
}

export default NavigationBar;