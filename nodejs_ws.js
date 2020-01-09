// 文档地址： npmjs.com/package/nodejs-websocket
const ws = require("nodejs-websocket")
let id = 0
const server = ws.createServer(conn => {
  // 此处为连接成功执行事件
  let data = {msg: `用户${id}进入聊天`, user: `用户${id}`, type: 'open'}
  system(data)
  conn.sendText(JSON.stringify(data))
  id++

  // 接收消息
  conn.on("text", str => {
    console.log("接到消息:" + str)
    boardcast(str)
    // conn.sendText('Received message...')
  })

  // 断开连接
  conn.on("close", (code, reason) => {
    console.log("断开连接：", code, reason)
    boardcast('close...')
  })

  // 发生错误
  conn.on("error", err => {
    console.log("发生错误：", err)
  })

  // 广播事件
  function boardcast (str) {
    // server.connections  保存每个连接进来的用户
    server.connections.forEach(conn => conn.sendText(str))
  }

  // 系统广播
  function system (data) {
    // server.connections  保存每个连接进来的用户
    let str = Object.assign({}, data, {user: '系统消息', type: 'broardcast'})
    server.connections.forEach(conn => conn.sendText(JSON.stringify(str)))
  }
}).listen(7002)

