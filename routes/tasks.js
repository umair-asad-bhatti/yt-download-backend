const express = require('express');
const TASKS_CONTROLLER = require('../controller/tasks');
const router = express.Router();
router.get('/', TASKS_CONTROLLER.getTasks);
router.post('/add', TASKS_CONTROLLER.addTask);
router.delete('/:taskId', TASKS_CONTROLLER.deleteTask);
module.exports = router;
