/* IMPORT API ROUTES TO PREFIX THEIR ENDPOINT NAMES AND PACKAGE THEM */
// Import dependencies
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// Add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

// Export the router
module.exports = router;
