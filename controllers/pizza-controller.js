/* PIZZA MODEL FUNCTIONALITY */
// Import the Pizza model
const { Pizza } = require('../models');

// Create the functionality for the Pizza model
const pizzaController = {
  // get all pizzas (callback function for `GET /api/pizzas` route)
  getAllPizza(req, res) {
    Pizza.find({})
      // populate comments
      .populate({
        path: 'comments', // we want the comments field populated
        select: '-__v', // tell Mongoose we dont care about the `__v` field on comments. `-` indicates you dont want it to be returned. If there was no `-` then the `__v` field would ONLY be returned
      })
      .select('-__v') // tell Mongoose we dont want the pizza's `__v` field either
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id (callback function for `GET /api/pizzas/:id)
  getPizzaById({ params }, res) {
    // destructured `params` out since thats the only data we need to fulfill the request
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

  // add a pizza to the database (callback function for `POST /api/pizzas)
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  // update pizza by id (callback function for `PUT /api/pizzas/:id`)
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true }) // if you dont set { new: true } then Mongoose will return the original document instead of the updated document
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Delete pizza from database by id (callback function for `DELETE /api/pizzas/:id`)
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },
};

// Export the pizzaController
module.exports = pizzaController;
