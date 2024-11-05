const { Server } = require('socket.io');
const io = new Server();

// Function to send notification
function notify(userId, message) {
    io.to(userId).emit('notification', message);
}

module.exports = { notify };
