const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.on('connection', socket => { 
  console.log('客户端连接成功')
  // 对发送消息过来的客户发送消息
  socket.send('This is a msg from serve...')
  // 监听消息事件
  socket.on('message', msg => {
    console.log('Receive message form clinet:', msg)
  })
  // 向所有除自身以外的客户发送消息
  socket.broadcast.emit('message', 'This is message for others...')
  // 向所有连接此服务器的客户发送广播
  io.emit('message', 'this is message from io...')
})
http.listen(7001, _ => console.log('serve listening on 7001...'))