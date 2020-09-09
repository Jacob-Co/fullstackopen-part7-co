import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import Logout from './components/Logout';

// reducer
import { setUser } from './reducer/userReducer';

// Server Request Helpers
import blogService from './services/blogs';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const localStorageKey = 'localBlogAppUser';
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

  useEffect(() => {
    const localUser = window.localStorage.getItem(localStorageKey);
    if (localUser) {
      const transformedUser = JSON.parse(localUser);
      dispatch(setUser(transformedUser));
      blogService.setToken(transformedUser.token);
    }
  }, [dispatch]);

  const setNotification = (message, type) => {
    setMessage(message);
    setNotifType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <>
      <Notification message={message} type={notifType} />
      {
        user === null
          ? <Login />
          : <div>
            {user.name} logged in
            <Logout />
            <Toggable label='create a new blog'>
              <BlogForm />
            </Toggable>
            <BlogList />
          </div>
      }
    </>
  );
};

export default App;