const { decode } = require('jsonwebtoken');
const Task = require('../models/task');
const User = require('../models/user');
const { decodeToken } = require('../utils/index');
const TASKS_CONTROLLER = {
  getTasks: async (req, res) => {
    //get the token
    const token = req.token;

    const tasks = await Task.findAll({
      where: { UserId: decodeToken(token).id },
    });
    const userTasks = tasks.map((task) => task.dataValues);

    res.json({ tasks: userTasks });
  },
  addTask: async (req, res) => {
    //get the access token of the user
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.status ||
      !req.body.priority
    )
      return res
        .status(400)
        .json({ error: 'title,description and status is required' });
    const token = req.token;
    const user = decodeToken(token);

    const { title, description, status, priority } = req.body;
    try {
      //get current user
      const currentUser = await User.findByPk(user.id);
      await currentUser.createTask({ title, description, status, priority });
      return res.status(200).json({ message: 'Task has been added' });
    } catch (error) {
      res.status(400).json({ errors: error.errors[0].message });
    }
  },
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Deletes a task based on the provided task ID.
   *
   * @param {Object} req - The request object containing task parameters.
   * @param {Object} req.params - The request parameters.
   * @param {string} req.params.taskId - The ID of the task to be deleted.
   * @param {Object} res - The response object used to send back the response.
   *
   * @returns {Object} - A JSON response indicating success or failure.
   *
   * @throws Will return an error message if the task is not found or if an error occurs during deletion.
   */

  /******  c2f2f8a7-ada9-4740-8964-32075382f304  *******/
  deleteTask: async (req, res) => {
    const taskId = req.params.taskId;
    //delete the recrod
    try {
      const count = await Task.destroy({ where: { id: taskId } });
      if (count === 0)
        return res.status(400).json({ message: 'Task not found' });
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  },
  updateTask: async (req, res) => {
    const taskId = req.params.taskId;
    //update the record
    try {
      await Task.update(req.body, {
        where: { id: taskId },
      });
      res.status(200).json({ message: 'task is updated successfully' });
    } catch (error) {
      res.status(400).json({ errors: error.errors[0].message });
    }
  },
};
module.exports = TASKS_CONTROLLER;
