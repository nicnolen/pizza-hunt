/* ENDPOINTS (ROUTES) FOR THE Comment MODEL */
// Import dependencies
const router = require('express').Router();
const {
  addComment,
  removeComment,
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment); // to delete a comment, you have to know exactly which pizza the comment originated with

// Export the router
module.exports = router;
