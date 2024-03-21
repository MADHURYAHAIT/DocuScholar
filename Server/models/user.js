const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fnm: {
    type: String,
    required: [true, "Username is Required"],
  },
  lnm: {
    type: String,
    required: [true, "Username is Required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
}, { timestamps: true });

// No need for `export default` in CommonJS
const Users = mongoose.model('Users', userSchema);

module.exports = Users;  // Export the model
