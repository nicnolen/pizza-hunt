/* _PREFIX AND PACKAGE THE API ROUTES */
// Import dependencies
const router = require('express').Router();
const apiRoutes = require('./api'); // Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const htmlRoutes = require('./html/html-routes');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
