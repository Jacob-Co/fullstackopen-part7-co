const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');
const Comment = require('../models/comments');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 });
  response.json(blogs);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request;
  const blog = await Blog.findById(request.params.id);
  const newComment = new Comment({
    comment: body.comment,
  });

  const returnedComment = await newComment.save();
  blog.comments = blog.comments.concat(returnedComment);
  const returnedBlog = await blog.save();
  await returnedBlog
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
    .execPopulate();

  response.json(returnedBlog);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const { token } = request;
  if (!token) {
    return response.status(401).json({ error: 'invalid or missing token' });
  }

  const user = await User.findById(token.id);
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const returnedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(returnedBlog._id);
  await user.save();
  await returnedBlog
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
    .execPopulate();
  response.status(201).json(returnedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).end();
  if (!request.token) {
    return response.status(401).json({ error: 'invalid or missing token' });
  }
  if (request.token.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'Token does not match' });
  }
  await blog.remove();
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const updatedBlog = {
    author: body.author || 'n/a',
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
  };
  const returnedBlog = await Blog
    .findByIdAndUpdate(id, updatedBlog, {
      new: true,
      runValidators: true,
    })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 });

  if (!returnedBlog) return response.status(404).end();

  response.json(returnedBlog);
});

module.exports = blogsRouter;
