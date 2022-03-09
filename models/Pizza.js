/* CREATE PIZZA MODEL */
// Import dependencies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Create the schema using the Schema constructor imported from Mongoose
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: 'You must provide a pizza name!',
      trim: true, // removes whitespace before and after the input string
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // if no value is provided in `createdAt`, this function will execute and provide a timestamp
      get: createdAtVal => dateFormat(createdAtVal), // getter. Everytime a pizza is retrieved, the value in the `createdAt` field will be formatted by the `dateFormat()` function
    },
    size: {
      type: String,
      default: 'Large',
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'], // enumerable data is a set of data that can be iterated over
      default: 'Large'
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
    // tell the schema it can use virtuals and getters
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false, // id is a virutal Mongoose returns and we dont need it
  }
);

// Get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  ); // reduce() method tallys up the total of every comment with its replys. Has 2 parameters, an accumulator and a current value.
});

// Create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// Export the Pizza model
module.exports = Pizza;
