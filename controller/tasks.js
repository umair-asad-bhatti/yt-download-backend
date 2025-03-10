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
    const token = req.token;
    const user = decodeToken(token);
    //TODO validate the task body from user/client
    //get the task information from body
    const { title, description, status } = req.body;
    try {
      const newUserTask = Task.build({
        title,
        description,
        status,
        UserId: user.id,
      });
      await newUserTask.save();
      return res.status(200).json({ message: 'Task has been added' });
    } catch (error) {
      res.status(400).json({ errors: error.errors[0].message });
    }
  },
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
};
module.exports = TASKS_CONTROLLER;
