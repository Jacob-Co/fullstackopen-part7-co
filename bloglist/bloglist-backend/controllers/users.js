const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/users');

usersRouter.post('/', async (req, res) => {
  const { body } = req;

  if (body.password.length < 3) {
    return res.status(400).json({ error: 'invalid password length' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const allUsers = await User
    .find({})
    .populate('blogs');
  res.json(allUsers);
});

module.exports = usersRouter;
