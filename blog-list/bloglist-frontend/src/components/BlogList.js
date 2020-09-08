import React from 'react';
import Blog from './Blog.js';

const BlogList = ({ blogs, addLike, removeBlog }) => {
  const sortByLikes = (blog1, blog2) => {
    return Number(blog2.likes) - Number(blog1.likes);
  };

  const blogsByLikes = blogs.sort(sortByLikes);

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
