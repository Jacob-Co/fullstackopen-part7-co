import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initializeBlog } from '../reducer/blogReducer'
import Blog from './Blog.js';

const BlogList = ({ blogs, addLike, removeBlog }) => {
  const sortByLikes = (blog1, blog2) => {
    return Number(blog2.likes) - Number(blog1.likes);
  };

  const dispatch = useDispatch();
  const blogsByLikes = useSelector(state => state.blogs.sort(sortByLikes));

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch]);

  // const blogsByLikes = blogs.sort(sortByLikes);

  return (
    <div id="blogList">
      <h2>blogs</h2>
      {blogsByLikes.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
        />
      )}
    </div>
  );
};

export default BlogList;
