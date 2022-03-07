/* COMMENT MODEL FUNCTIONALITY */
// Import dependencies
const { Comment, Pizza } = require('../models');

// Create functionality for the Comment model
const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    console.info(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } }, // $push adds data to an array. All MongoDB functions start with a $
          { new: true } // recieve back the updated pizza with the pizza comment
        );
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

  // remove comment
  removeComment() {},
};

// Export modules
module.exports = commentController;
