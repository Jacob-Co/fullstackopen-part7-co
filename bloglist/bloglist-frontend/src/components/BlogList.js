import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'

import { initializeBlog } from '../reducer/blogReducer'
import Blog from './Blog.js';
import BlogForm from './BlogForm';

const BlogList = () => {
  const sortByLikes = (blog1, blog2) => {
    return Number(blog2.likes) - Number(blog1.likes);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();
  const blogsByLikes = useSelector(state => state.blogs.sort(sortByLikes));

  const blogMatch = useRouteMatch('/blogs/:id');
  const blog = blogMatch
    ? blogsByLikes.find(blog => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch]);

  return (
    <div id="blogList">
      <h2>Blog App</h2>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>

        <Route path="/">
          <BlogForm />
          {blogsByLikes.map(blog =>
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              <div style={blogStyle}>{blog.title} {blog.author}</div>
            </Link>
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default BlogList;
