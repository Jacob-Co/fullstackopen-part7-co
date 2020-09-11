import React from 'react';

const CommentList = ({blog}) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
      </ul>
    </div>
  )
}

export default CommentList;