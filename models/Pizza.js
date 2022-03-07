/* CREATE PIZZA MODEL */
// Import dependencies
const { Schema, model } = require('mongoose');

// Create the schema using the Schema constructor imported from Mongoose
const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // If no value is provided in `createdAt`, this function will execute and provide a timestamp
  },
  size: {
    type: String,
    default: 'Large',
  },
  toppings: [], // Could have specified `Array` instead
  comments: [
    {
      type: String, // Placeholder
    },
  ],
});

// Create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// Export the Pizza model
module.exports = Pizza;
