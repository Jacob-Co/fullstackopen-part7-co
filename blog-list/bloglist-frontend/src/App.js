import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Link,
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
  const linkPadding = {
    padding: "5px"
  }

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
            <nav>
              <Link style={linkPadding} to="/">blogs</Link>
              <Link style={linkPadding} to="/users">users</Link>
              {user.name} logged in <Logout />
            </nav>

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
                <BlogForm />
                <BlogList />
              </Route>
            </Switch>
          </div>
      }
    </>
  );
};

export default App;