var ws = require("nodejs-websocket")
var server = ws.createServer(conn => {
  conn.on("text", str => {
    console.log("Received:" + str)
    conn.sendText('Received message...')
  })
  conn.on("close", (code, reason) => {
    console.log("Connection closed")
  })
  conn.on("error", err => {
    console.log("handle err")
    console.log(err)
  })
}).listen(7001)
