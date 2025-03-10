const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('tasks', 'postgres', '1234', {
//   host: 'localhost',
//   dialect: 'postgres',
// });
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite', // Use SQLite as the database dialect
  storage: './db.sqlite',
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

module.exports = sequelize;
