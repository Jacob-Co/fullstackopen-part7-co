import React from 'react';

const User = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h2>{user.username}</h2>
      <ul><strong>added blogs</strong></ul>
      {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </div>
  )
}

export default User;