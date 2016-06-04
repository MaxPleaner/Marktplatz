// ------------------------------
// Everything is wrapped in an IIFE
// ------------------------------

(function() {

// ------------------------------
// 
// ------------------------------

  require("colors")
  var _ = require("./underscore")

  // Remember to edit /server/env_vars.js before starting
  process.env = _.extend(process.env, require("./server/env_vars.js"))
  
  var server = {}
  var models = require("./server/models.js"))

  var newExpressApp = function(httpServer) {
    var express = require('express'),
    var expressApp = express()
    require("./server/expressConfig.js")
    require("./server/routes.js")
    return expressApp
  }

  var newHttpServer = function() {
    return require("http").createServer()
  }

  var newWebsocketServer = function(httpServer) {
    var httpServer = require("http").createServer()
    var WsServer = require('ws').Server
    WsServer({ httpServer: httpServer })
    return httpServer
  }
  
  var startServer = function() {
    console.log("starting server".green)
    var HttpServer = newHttpServer()
    var WebsocketServer = newWebsocketServer(HttpServer)
    var expressApp = newExpressApp(HttpServer)
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
  
  var startREPL = function() {
    console.log("starting REPL".green)
    var repl = require("repl")
    var context = repl.start("> ").context
    context.util = require("util")
  }
  

  server.Models.syncModels().then(function(){
    console.log("synced models".green)
    if (require.main === module) {
      startServer()
    } else {
      startREPL()
    }
  })

// ------------------------------
// The IIFE end
// ------------------------------

})()

// ------------------------------
//
// ------------------------------