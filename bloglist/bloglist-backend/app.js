const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('express-async-errors');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const mongoUrl = config.MONGODB_URI;
logger.info('Connecting to MongoDB...');
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => logger.info('Connected to MongoDB'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingRouter');
  app.use('/api/testing', testingRouter);
}
app.use(middleware.errorHandler);

module.exports = app;
