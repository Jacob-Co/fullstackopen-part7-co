import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Logout from './Logout';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  font-size: 1.5em;
  flex-wrap: wrap;
`
const StyledLinkArea = styled.div`
  padding: .45rem 0;
  background-color: #1B1869;
  width: 60%;
  display: flex;
  justify-content: space-evenly;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: red
  }
  display: block;
`
const StyledUserArea = styled.div`
  padding: .45rem 0;
  background-color: #DE6A2E;
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
`

const StyledUser = styled.div`
  color: white; 
`

const NavigationBar = ({user}) => {
  return(
    <NavBar>
      <StyledLinkArea>
        <StyledLink to="/">Blogs</StyledLink>
        <StyledLink to="/users">Users</StyledLink>
      </StyledLinkArea>
      <StyledUserArea>
        <StyledUser>{user.name} logged in</StyledUser>
        <Logout />
      </StyledUserArea>
    </NavBar>
  )
}

export default NavigationBar;