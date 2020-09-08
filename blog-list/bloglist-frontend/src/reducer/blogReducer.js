import blogService from '../services/blogs';

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const modifiedBlog = { ...blog, likes: blog.likes + 1};
    const returnBlog = await blogService.putBlog(modifiedBlog);
    dispatch({
      type: 'LIKE_BLOG',
      data: returnBlog
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.data;
    case 'LIKE_BLOG':
      return state.concat(action.data);
    default:
      return state;
  }
};

export default blogReducer;