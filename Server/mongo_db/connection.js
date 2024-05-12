require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("Error connecting to MongoDB:", error));

module.exports = mongoose.connection;
