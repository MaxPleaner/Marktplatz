module.exports = function() {
  var httpServer =  require("http").createServer(),
  var WebSocketServer =  require('ws').Server,
  var express = require("express")
  return {
    httpServer: httpServer,
    WebSocketServer: WebSocketServer,
    express: express
    wss: new WebSocketServer({ server: httpServer }),
    url: require('url'),
    port: 4080,
    expressApp: express(),
  }
}()