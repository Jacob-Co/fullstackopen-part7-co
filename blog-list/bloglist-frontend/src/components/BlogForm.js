import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Toggable from './Toggable';
import { createBlog } from '../reducer/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();
  const toggleBlogForm = useRef();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
      dispatch(createBlog({title, author, url}));
      if (title && url) { 
        toggleBlogForm.current.toggleVisibility();
        setTitle('');
        setAuthor('');
        setUrl('');
      }
  }

  return (
    <Toggable label="Create new blog" ref={toggleBlogForm}>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
        title:
          <input
            type="text"
            name="Title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            name="Author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            name="Url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="blogCreate-button">Create</button>
      </form>
    </Toggable>
  );
};

export default BlogForm;
