/* CREATE COMMENT MODEL */
// Import dependecies
const { Schema, model } = require('mongoose');

// Create the Comment schema
const CommentSchema = new Schema({
  writtenBy: {
    type: String,
  },
  commentBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Comment model
const Comment = model('Comment', CommentSchema);

// Export module
module.exports = Comment;
