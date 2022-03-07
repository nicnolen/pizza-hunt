/* CREATE PIZZA MODEL */
// Import dependencies
const { Schema, model } = require('mongoose');

// Create the schema using the Schema constructor imported from Mongoose
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now, // if no value is provided in `createdAt`, this function will execute and provide a timestamp
    },
    size: {
      type: String,
      default: 'Large',
    },
    toppings: [], // could have specified `Array` instead
    comments: [
      {
        type: Schema.Types.ObjectId, // tell Mongoose to expect an `ObjectId` and that the data comes from the Comment model
        ref: 'Comment', // tells the Pizza model which documents to search for the right comments
      },
    ],
  },
  {
    // tell the schema it can use virtuals
    toJSON: {
      virtuals: true,
    },
    id: false, // id is a virutal Mongoose returns and we dont need it
  }
);

// Get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// Create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// Export the Pizza model
module.exports = Pizza;
