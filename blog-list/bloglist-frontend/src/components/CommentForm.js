import React from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../reducer/blogReducer';

const CommentForm = ({blog}) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog, event.target.comment.value))
    event.target.comment.value = '';
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="comment"/>
        <button>submit comment</button>
      </form>
    </div>
  )
}

export default CommentForm