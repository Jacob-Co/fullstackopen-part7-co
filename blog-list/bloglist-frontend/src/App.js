import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Logout from './components/Logout';

// reducer
import { setUser } from './reducer/userReducer';
import { createNotification } from './reducer/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const localUser = window.localStorage.getItem('localBlogAppUser');
    if (localUser) {
      const transformedUser = JSON.parse(localUser);
      dispatch(setUser(transformedUser));
      dispatch(createNotification(`Welcome ${transformedUser.name}`, 'success'))
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
          </div>
      }
    </>
  );
};

export default App;