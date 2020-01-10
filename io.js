const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
let id = 0
io.on('connection', socket => { 
  // 发送消息到当前客户端
  socket.send('欢迎加入！')
  id = id || socket.id
  // 监听消息事件
  socket.on('message', msg => {
    switch (msg) {
      case '0':
        // 向所有除自身以外的客户发送消息
        socket.broadcast.emit('message', '向所有除自身以外的客户发送的消息...')
        break
      case '1':
        // 向所有连接此服务器的客户发送广播
        io.emit('message', '向所有连接此服务器的客户发送的消息...')
        break
      case '2':
        // 向自身发送消息
        socket.send('向自身发送的消息...')
        break
      case '3':
        // 查询房间id
        socket.send(`本房间id: ${socket.id}`)
        break;
      case '4':
        // 向其它房间发送消息
        console.log(id)
        socket.to(id).emit('message', `来自${socket.id}的消息...`)
        break 
    }
  })
})
http.listen(7001, _ => console.log('serve listening on 7001...'))