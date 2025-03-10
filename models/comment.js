const { DataTypes } = require('sequelize');
const seq = require('../database/connectDB');
const Task = require('./task');
const User = require('./user');
const Comment = seq.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Task.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Task, { onDelete: 'CASCADE' });
//comment also have a user id
User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User, { onDelete: 'CASCADE' });
module.exports = Comment;
