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

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    });
  };
};

const blogReducer = (state = [], action) => {
  let index;

  switch (action.type) {
    case 'INIT_BLOG':
      return action.data;
    case 'LIKE_BLOG':
      index = state.findIndex(blog => blog.id === action.data.id);
      return state.slice(0, index).concat(state.slice(index + 1), action.data);
    case 'REMOVE_BLOG':
      index = state.findIndex(blog => blog.id === action.data.id);
      return state.slice(0, index).concat(state.slice(index + 1));
    default:
      return state;
  }
};

export default blogReducer;