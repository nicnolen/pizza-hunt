/* IMPORT API ROUTES TO PREFIX THEIR ENDPOINT NAMES AND PACKAGE THEM */
// Import dependencies
const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

// Add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);
// Add prefix of `/comments` to the commentRoutes
router.use('/comments', commentRoutes);

// Export the router
module.exports = router;
