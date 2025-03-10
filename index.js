require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const TasksRoutes = require('./routes/tasks');
const sequelize = require('./database/connectDB');
const {
  validateRequestBody,
  validateAccessToken,
} = require('./middleware/index');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validateRequestBody);

//auth routes
app.use('/auth', authRoutes);
//protected tasks  routes
app.use('/tasks', validateAccessToken, TasksRoutes);

app.listen(3000, () => console.log('server started at 3000'));
