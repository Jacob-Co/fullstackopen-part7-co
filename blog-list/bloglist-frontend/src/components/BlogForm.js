import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBlog } from '../reducer/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(createBlog({title, author, url}));
    } catch(e) {
      alert('Missing url or title')
    }
  }

  return (
    <div>
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
    </div>
  );
};

export default BlogForm;
