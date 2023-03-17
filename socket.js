import socketIO from 'socket.io';
import http from 'http';
import ChatMessage from './models/chat-message';

const initSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // handle chat events
    socket.on('chat:message', async (messageData) => {
      try {
        const { from, to, message } = messageData;
        const newMessage = new ChatMessage({ from, to, message });
        await newMessage.save();
        io.emit('chat:message', newMessage);
      } catch (err) {
        console.error(err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default initSocket;
