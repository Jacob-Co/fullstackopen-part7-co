import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducer/blogReducer'
import CommentList from './CommentList';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (!blog) return null;

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div>
        <div><a rel="noopener noreferrer" href={`${blog.url}`} target="_blank">{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
        <div>added by {blog.user.username}</div>
        <div><button onClick={() => {
          dispatch(removeBlog(blog))
          const webToken = window.localStorage.getItem('localBlogAppUser');
          const currentUser = JSON.parse(webToken).username;
          if (blog.user.username === currentUser) history.push('/');
          }}>Delete Blog</button></div>
      </div>
      
      <CommentList blog={blog} />
    </div>
  );
};

export default Blog;
