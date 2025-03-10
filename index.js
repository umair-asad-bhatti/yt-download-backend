require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const TasksRoutes = require('./routes/tasks');
const commentRoutes = require('./routes/comment');
const sequelize = require('./database/connectDB');
const {
  validateRequestBody,
  validateAccessToken,
} = require('./middleware/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/index');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validateRequestBody);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//auth routes
app.use('/auth', authRoutes);
//protected tasks routes
app.use('/tasks', validateAccessToken, TasksRoutes);
//proctected comments routes
app.use('/comment/task', validateAccessToken, commentRoutes);
sequelize.sync({ alter: true }).then(() => {
  console.log('All tables have been sync');
});
app.listen(3000, () => console.log('server started at 3000'));
