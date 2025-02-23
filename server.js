const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('node:http');

const { Server } = require('socket.io');
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(bodyParser.json()); // For JSON data (if your client sends JSON)
app.use(router);
app.use(express.static('public'));

server.listen(3000, () => {
  console.log('server listening on 3000');
});
module.exports = { app, router, io };
