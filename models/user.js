const { DataTypes } = require('sequelize');
const seq = require('../database/connectDB');

const tableFields = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'This email is already in use.', // Custom message for unique constraint
    },
    validate: {
      notEmpty: {
        msg: 'Email cannot be empty.', // Custom message for empty email
      },
      isEmail: {
        msg: 'Invalid email format.', // Custom message for invalid format
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty.', // Custom message for empty password
      },
    },
  },
};

// Define User model
const User = seq.define('User', tableFields);

// Sync model with database
// User.sync();

module.exports = User;
