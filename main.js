// ------------------------------
// Everything is wrapped in an IIFE
// ------------------------------

var server = module.exports = (function() {

// ------------------------------
// The method which starts it all
// ------------------------------

function begin(server) {
  server.Models.syncModels(server.ORM).then(function(){
    console.log("synced models".green)
    if (require.main === module) {
      startServer(server)
    } else { startServer(server) }
  })  
}

// ------------------------------
// But first ...
// ------------------------------

  require("colors")
  var _ = require("underscore")

  // Remember to edit /server/env_vars.js before starting
  process.env = _.extend(process.env, require("./server/env_vars.js"))
  
  var server = {}
  var models = require("./server/models.js")
  server.sequelize = models.sequelize
  server.ORM = models.ORM
  server.Models = models.Models

  var newExpressApp = function(httpServer, server) {
    var express = require('express')
    var expressApp = express()
    expressApp = require("./server/expressConfig.js")(expressApp, express)
    expressApp = require("./server/routes.js")(expressApp, server)
    return expressApp
  }

  var newHttpServer = function() {
    return require("http").createServer()
  }

  var newWebsocketServer = function(httpServer) {
    var httpServer = require("http").createServer()
    var WsServerInit = require('ws').Server
    var WsServer = WsServerInit({ server: httpServer })
    return httpServer
  }
  
  var startServer = function(server) {
    console.log("starting server".green)
    var HttpServer = newHttpServer()
    var WebsocketServer = newWebsocketServer(HttpServer)
    var expressApp = newExpressApp(HttpServer, server)
    HttpServer.on('request', expressApp);
    var url = require('url')
    var port = 4080
    HttpServer.listen(port, function () {
      console.log(`Listening on ${HttpServer.address().port}`.green)
    })
    return {
      HTTP: HttpServer, Websocket: WebsocketServer, express: expressApp,
      url: url, port: port
    }
  }
  
// ------------------------------
// The IIFE end
// ------------------------------
  
  begin(server)
  return server
})()
  
// ------------------------------
//
// ------------------------------