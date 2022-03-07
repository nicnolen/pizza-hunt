/* PIZZA MODEL FUNCTIONALITY */
// Import the Pizza model
const { Pizza } = require('../models');

// Create the functionality for the Pizza model
const pizzaController = {
  // get all pizzas (callback function for `GET /api/pizzas` route)
  getAllPizza(req, res) {
    Pizza.find({}) 
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id (callback function for `GET /api/pizzas/:id)
  getPizzaById({ params }, res) { // destructured `params` out since thats the only data we need to fulfill the request
    Pizza.findOne({ _id: params.id })
      .then(dbPizzaData => {
        // if no pizza is found, send a 404 (pizza doesnt exist)
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },
};

// Export the pizzaController
module.exports = pizzaController;
