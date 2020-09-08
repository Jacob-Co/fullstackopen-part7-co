import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initializeBlog, likeBlog, removeBlog } from '../reducer/blogReducer'
import Blog from './Blog.js';

const BlogList = () => {
  const sortByLikes = (blog1, blog2) => {
    return Number(blog2.likes) - Number(blog1.likes);
  };

  const dispatch = useDispatch();
  const blogsByLikes = useSelector(state => state.blogs.sort(sortByLikes));

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch]);

  return (
    <div id="blogList">
      <h2>blogs</h2>
      {blogsByLikes.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => dispatch(likeBlog(blog))}
          removeBlog={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
              dispatch(removeBlog(blog))
            }}
          }
        />
      )}
    </div>
  );
};

export default BlogList;
