/* CREATE COMMENT MODEL */
// Import dependecies
const { Schema, model, Types } = require('mongoose'); // Types generates a unique identifier instead of the default '_id' field
const dateFormat = require('../utils/dateFormat');

// Create a Reply schema
const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Create the Comment schema
const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual to get the total reply count
CommentSchema.virtual('replyCount').get(function () {
  return this.replies.length;
});

// Create the Comment model
const Comment = model('Comment', CommentSchema);

// Export module
module.exports = Comment;
