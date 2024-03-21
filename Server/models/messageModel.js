const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: "User",
  },
  text: {
    type: String,
  },
  bot: {
    type: Boolean, // Use Boolean instead of Bot (case-sensitive)
  },
}, {
  timestamps: true,
});

// No need for `export default` in CommonJS
const messages = mongoose.model('Message', messageSchema);

module.exports = messages;  // Export the model
