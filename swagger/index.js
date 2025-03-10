const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for my project',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Change this to your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (adjust as needed)
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
