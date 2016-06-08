var WebsocketServer = module.exports = function(wsServer, server){

  var curry = server.curry

  wsServer.connections = {}

  var _ = server._


  function connectionOpened (openWs){
    openWs.on('close', connectionClosed)
    openWs.on('message', onMessage(openWs))
  }

  function connectionClosed (closedWs){
    var wsList = wsServer.connections
    for (var key of Object.keys(wsList)) {
      if (wsList[key] == closedWs) {
        var user = _.extend({}, closedWs.user)
        delete wsServer[key]
        if (user) { userRemove(user.username) }
      }
    }
  }

  function login(openWs, sessionToken) {
    wsServer.connections[sessionToken] = openWs
    openWs.send(JSON.stringify({cmd: "loginSuccess", sessionToken: sessionToken}))
  }

  function sendToAll (data) {
    var wsList = wsServer.connections
    for (var key of Object.keys(wsList)) {
      wsList[key].send(JSON.stringify(data))
    }
  }

  function mapData () {
    var data = []
    var wsList = wsServer.connections
    for (var key of Object.keys(wsList)) {
      var user = {}
      user.latitude =  wsList[key].user.latitude
      user.longitude =  wsList[key].user.longitude
      user.username =  wsList[key].user.username
      data.push(user)
    }
    return data
  }

  function loginConfirm(openWs) {
    openWs.send(JSON.stringify({
      cmd: "mapData",
      users: mapData()
    }))
  }

  function userRemove(username) {
    sendToAll({cmd: "userRemove", user: { username: username }})
  }

  function mapPing(openWs, user) {
    var wsList = wsServer.connections
    var sessionToken = user.sessionToken
    delete user.sessionToken
    if (wsList[sessionToken].user) {cmd = "userChange"} else { cmd = "mapPing" }
    wsList[sessionToken].user = user
    sendToAll({ cmd: "mapPing", user: user } )
  }

  var onMessage = curry(function (openWs, message) {
    msg = JSON.parse(message)
    switch (msg.cmd) {
      case "login":
        console.log("login")
        login(openWs, msg.sessionToken)
        break;
      case "loginConfirm":
        console.log("loginConfirm")
        loginConfirm(openWs)
        break;
      case "mapPing":
        console.log("mapPing")
        mapPing(openWs, msg.user)
        break;
    }
  })

  wsServer.on("connection", connectionOpened)

  return wsServer
}