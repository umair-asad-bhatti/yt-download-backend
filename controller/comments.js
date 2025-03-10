const Task = require('../models/task');
const Comment = require('../models/comment');
const User = require('../models/user');
const { decodeToken } = require('../utils');
const COMMENTS_CONTROLLER = {
  addComment: async (req, res) => {
    //get the task id
    const taskId = req.params.taskId;
    //get the commment from post req body
    const comment = req.body.comment;
    //get the token and extract the current user who is adding the comment
    const currentUser = decodeToken(req.token);

    try {
      const currentTask = await Task.findByPk(taskId);
      if (currentTask == null)
        res.status(400).json({ error: `No task found with id ${taskId}` });

      //add the comment to the task
      await currentTask.createComment({
        content: comment,
        UserId: currentUser.id,
      });
      res.status(200).json({ message: 'comment has been added' });
    } catch (error) {
      res.status(400).json({ error: error.errors[0].message });
    }
  },
  deleteComment: (req, res) => {
    res.send('delete comment');
  },
  updateComment: (req, res) => {
    res.send('update comment');
  },
  getAllComments: async (req, res) => {
    const taskId = req.params.taskId;

    try {
      // Get all comments of a task, including the associated User
      const allComments = await Comment.findAll({
        where: { TaskId: taskId },
        include: {
          model: User,
          attributes: { exclude: ['password'] },
        }, // Include the User model to get user details
      });

      // Extract the dataValues from each comment
      const comments = allComments.map((comment) => {
        return {
          ...comment.dataValues, // Include all comment dataValues
          User: comment.User ? comment.User.dataValues : null, // Include user dataValues if User exists
        };
      });

      res.status(200).json({ comments });
    } catch (error) {
      console.error('Error fetching comments:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while fetching comments' });
    }
  },
};
module.exports = COMMENTS_CONTROLLER;
