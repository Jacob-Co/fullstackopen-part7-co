import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Switch,
  Route
} from 'react-router-dom';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Logout from './components/Logout';
import Users from './components/Users';

// reducer
import { setUser } from './reducer/tokenReducer';

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
      <Notification />
      {
        user === null
          ? <Login />
          : <div>
            {user.name} logged in
            <Logout />

            <Switch>
              <Route path="/user/:id">
                <Users />
              </Route>
              
              <Route path="/">
                <BlogForm />
                <BlogList />
                <Users />
              </Route>
            </Switch>
          </div>
      }
    </>
  );
};

export default App;