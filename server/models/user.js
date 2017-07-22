const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    minlength: 3,
    trim: true,
    required: true
  }
});

module.exports = { User };