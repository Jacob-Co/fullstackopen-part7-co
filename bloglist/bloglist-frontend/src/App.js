import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'

import {
  Switch,
  Route
} from 'react-router-dom';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import Notification from './components/Notification';

import Users from './components/Users';
import NavigationBar from './components/NavigationBar';

// reducer
import { setUser } from './reducer/tokenReducer';

const StyledAppContainer = styled.div`
  background-color: #FDCA29;
`

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.token);

  useEffect(() => {
    const localUser = window.localStorage.getItem('localBlogAppUser');
    if (localUser) {
      const transformedUser = JSON.parse(localUser);
      dispatch(setUser(transformedUser));
    }
  }, [dispatch]);

  return (
    <>
      {
        user === null
          ? <StyledAppContainer>
              <Notification />
              <Login />
            </StyledAppContainer>
          : <StyledAppContainer>
              <NavigationBar user={user}/>
              <Notification />

              <Switch>
                <Route path="/user/:id">
                  <Users />
                </Route>

                <Route path="/users">
                  <Users />
                </Route>

                <Route path="/blogs/:id">
                  <BlogList />
                </Route>

                <Route path="/">
                  <BlogList />
                </Route>
              </Switch>
            </StyledAppContainer>
      }
    </>
  );
};

export default App;