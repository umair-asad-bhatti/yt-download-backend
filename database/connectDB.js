const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tasks', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1); // Exit the script on DB connection failure
  }
};

// Call the function and handle unexpected errors
connectDB();

// Catch unhandled promise rejections globally
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

module.exports = sequelize;
