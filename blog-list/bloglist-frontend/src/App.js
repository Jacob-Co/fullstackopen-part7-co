import React, { useState, useEffect, useRef } from 'react';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';

// Server Request Helpers
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const localStorageKey = 'localBlogAppUser';
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

  const toggleBlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const localUser = window.localStorage.getItem(localStorageKey);
    if (localUser) {
      const transformedUser = JSON.parse(localUser);
      setUser(transformedUser);
      blogService.setToken(transformedUser.token);
    }
  }, []);

  const setNotification = (message, type) => {
    setMessage(message);
    setNotifType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await loginService.login({ username, password });
      window.localStorage.setItem(localStorageKey, JSON.stringify(loginUser));
      setUser(loginUser);
      blogService.setToken(loginUser.token);
      setNotification('Successfully signed in', 'success');
    } catch (e) {
      setNotification('Invalid username or password', 'warning');
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    window.localStorage.removeItem(localStorageKey);
    window.location.reload();
    setUser('');
    setNotification('Successfully signed out', 'warning');
  };

  const addBlog = async (blogObj) => {
    try {
      const returnedBlog = await blogService.postBlog(blogObj);
      toggleBlogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(returnedBlog));
      setNotification(`Added new blog ${returnedBlog.title}`, 'success');
      return true;
    } catch (e) {
      setNotification('Missing title, author or url', 'warning');
      return false;
    }
  };

  const addLike = async (blogObj) => {
    const modifiedBlog = await blogService.putBlog(blogObj);
    setBlogs(blogs.map(blog => blog.id === modifiedBlog.id ? modifiedBlog : blog));
  };

  const removeBlog = async (blogObj) => {
    try {
      await blogService.deleteBlog(blogObj);
      setBlogs(blogs.filter(blog => blog.id !== blogObj.id));
    } catch (e) {
      setNotification('You don\'t have permission to delete that', 'warning');
    }
  };

  return (
    <>
      <Notification message={message} type={notifType} />
      {
        user === null
          ? <Login
            handleSubmit={handleLogin}
            username={username}
            handleUsernameChange={setUsername}
            password={password}
            handlePasswordChange={setPassword}
          />
          : <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
            <Toggable label='create a new blog' ref={toggleBlogFormRef}>
              <BlogForm
                addBlog={addBlog}
              />
            </Toggable>
            <BlogList
              blogs={blogs}
              addLike={addLike}
              removeBlog={removeBlog}
            />
          </div>
      }
    </>
  );
};

export default App;