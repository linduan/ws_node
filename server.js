const app = require('express')()
const server = app.listen(7001);   
const io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {
  console.log('123')
})