/* ROUTES FOR THE Pizza MODEL */
// Import dependencies
const router = require('express').Router();

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get()
  .post();

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get()
  .put()
  .delete();

// Export the router
module.exports = router;