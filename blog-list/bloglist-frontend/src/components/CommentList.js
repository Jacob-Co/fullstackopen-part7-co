import React from 'react';

import CommentForm from './CommentForm';

const CommentList = ({blog}) => {
  return (
    <div>
      <h3>comments</h3>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
      </ul>
    </div>
  )
}

export default CommentList;