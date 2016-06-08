var WebsocketServer = module.exports = function(wsServer){
  wsServer.connections = {}
  wsServer.on("connection", function(openWs){
    console.log("openWs connect")
    openWs.on('close', function(closedWs){
      console.log("ws-disconnect")
      delete wsServer.connections[closedWs]
    })
    wsServer.connections[openWs] = true
  })

  return wsServer
}