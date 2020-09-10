import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
            <BlogForm />
            <BlogList />
            <Users />
          </div>
      }
    </>
  );
};

export default App;