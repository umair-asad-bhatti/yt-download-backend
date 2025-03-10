const { DataTypes } = require('sequelize');
const seq = require('../database/connectDB');
const User = require('./user');
const tableFields = {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Title already in use', // Custom message for unique constraint
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    default: 'medium',
  },
};
//defining the relation
const Task = seq.define('Task', tableFields);
User.hasMany(Task);
Task.belongsTo(User); // Add this line to establish the relationship properly
// Task.sync();
module.exports = Task;
