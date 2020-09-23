const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 1,
  },
});

commentSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj._v;
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
