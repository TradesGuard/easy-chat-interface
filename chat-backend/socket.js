// api/socket.js
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://your-frontend-url.vercel.app',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = (req, res) => {
  server.listen(4000, () => {
    res.status(200).send('Server listening on port 4000');
  });
};
