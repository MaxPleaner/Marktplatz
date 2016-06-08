var WebsocketServer = module.exports = function(wsServer, server){

  var curry = server.curry

  wsServer.connections = {}


  function connectionOpened (openWs){
    openWs.on('close', connectionClosed)
    openWs.on('message', onMessage(openWs))
  }

  function connectionClosed (closedWs){
    var wsList = wsServer.connections
    for (var key of Object.keys(wsList)) {
      if (wsList[key] == closedWs) {
        delete wsServer[key]
      }
    }
  }

  function login(openWs, sessionToken) {
    wsServer.connections[sessionToken] = openWs
  }

  var onMessage = curry(function (openWs, message) {
    msg = JSON.parse(message)
    switch (msg.cmd) {
      case "login":
        login(openWs, message.sessionToken)
        break;
    }
  })

  wsServer.on("connection", connectionOpened)

  return wsServer
}