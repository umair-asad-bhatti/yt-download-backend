const express = require('express');
const router = express.Router();
const COMMENTS_CONTROLLER = require('../controller/comments');
router.post('/:taskId', COMMENTS_CONTROLLER.addComment); //add comment to a task
router.get('/:taskId', COMMENTS_CONTROLLER.getAllComments); //add comment to a task
module.exports = router;
