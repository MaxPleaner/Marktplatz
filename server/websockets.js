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

  function loginConfirm(openWs) {
    openWs.send(JSON.stringify({
      cmd: "mapData",
      users: mapData()
    }))
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
      var user = wsList[key].user
      if (user) { data.push(_.extend({}, user)) }
    }
    return data
  }


  function userRemove(username) {
    sendToAll({cmd: "userRemove", users: [{ username: username }]})
  }

  function setCoords(user) {
    user.latitude = user.latitude * Math.random()
    user.longitude = user.longitude * Math.random()
    return user
  }

  function persistProfileText(user) {
    return server.Models.User.findOne({
      sessionToken: user.sessionToken
    })
    .then(function(userRecord){
      return userRecord.updateAttributes({
        profileText: user.profileText
      })
    })
  }

  function mapPing(openWs, user) {
    user = setCoords(user)
    var wsList = wsServer.connections
    var sessionToken = user.sessionToken
    delete user.sessionToken
    if (wsList[sessionToken].user) {cmd = "userChange"} else { cmd = "mapData" }
    wsList[sessionToken].user = user
    persistProfileText(user)
    .then(function(userRecord){
      sendToAll({
        cmd: cmd,
        users: [_.extend(user, {profileText: userRecord.profileText})]
      })
    })
    .catch(function(err){
      console.dir(err)
      console.log("err with map ping")
    })
  }

  var onMessage = curry(function (openWs, message) {
    msg = JSON.parse(message)
    switch (msg.cmd) {
      case "login":
        login(openWs, msg.sessionToken)
        break;
        loginConfirm(openWs)
        break;
      case "mapPing":
        mapPing(openWs, msg.user)
        break;
    }
  })

  wsServer.on("connection", connectionOpened)

  return wsServer
}