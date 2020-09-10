import blogService from '../services/blogs';
import { createNotification } from '../reducer/notificationReducer';

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
    const returnedBlog = await blogService.putBlog(modifiedBlog);
    dispatch({
      type: 'LIKE_BLOG',
      data: returnedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try{
      await blogService.deleteBlog(blog);
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog
      });
      dispatch(createNotification(`Deleted blog: ${blog.title}`, 'warning'))
    } catch (e) {
      dispatch(createNotification('Can\'t delete a blog that is not yours', 'warning'))
    }
  };
};

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.postBlog(blogObj);
    dispatch({
      type: 'NEW_BLOG',
      data: returnedBlog
    })
    dispatch(createNotification(`Created blog: ${returnedBlog.title}`, 'success'))
  }
}

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
    case 'NEW_BLOG':
      return [...state, action.data]
    default:
      return state;
  }
};

export default blogReducer;