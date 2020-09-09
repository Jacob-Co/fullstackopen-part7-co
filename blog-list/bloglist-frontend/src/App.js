import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Logout from './components/Logout';

// reducer
import { setUser } from './reducer/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

  useEffect(() => {
    const localUser = window.localStorage.getItem('localBlogAppUser');
    if (localUser) {
      const transformedUser = JSON.parse(localUser);
      dispatch(setUser(transformedUser));
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
            <BlogForm />
            <BlogList />
          </div>
      }
    </>
  );
};

export default App;