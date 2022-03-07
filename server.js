/* SERVER */
// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// Tell Mongoose what database we want to connect to
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt', // If the environment variable MONGODB_URI exists, use that. Otherwise, use the local MongoDB server's database
);

// Log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
