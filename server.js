const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

// Discord Botからの通知を受け取るAPI
app.post('/api/update', (req, res) => {
  const { username } = req.body;
  // OBS画面側へ名前を転送
  io.emit('user_pressed', { username: username });
  res.status(200).send({ status: 'ok' });
});

// 静的ファイル（HTMLなど）を配信する
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});