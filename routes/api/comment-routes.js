/* ENDPOINTS (ROUTES) FOR THE Comment MODEL */
// Import dependencies
const router = require('express').Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
// NOTE: PUT route for the reply because we arent creating a new reply, we are updating the existing comment resource
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment); // to delete a comment, you have to know exactly which pizza the comment originated with

// Route to delete a reply (/api/comments/:pizzaId/:commentId/:replyId)
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

// Export the router
module.exports = router;
