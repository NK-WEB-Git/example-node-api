const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 3,
    trim: true,
    required: true,
    unique: [true, 'Email is required'],
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email!'
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true
    }
  },
  ]
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123');

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  })
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded = '';

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    })
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
