// Exports server object, which is a namespace for other modules
// such as Auth, Models, ORM, etc.
// Begin the server with server.begin(callback)
// the callback is passed a modified server object
var server = module.exports = function(callback) {
  
  var server = {}

  require("colors")
  server._ = require("underscore")
  var _ = server._
  var curry = server.curry = require("curry")
  // Remember to edit /server/env_vars.js before starting
  process.env = _.extend(process.env, require("./server/env_vars.js"))

  server.nullifyEmptyStringVals = function(params) {
    var params = _.extend({}, params)
    for (var key of Object.keys(params)) {
      val = params[key]
      if ((typeof val == 'string') && (val.length > 0)) {} 
      else { delete params[key] }
    };
    return params;
  }
  var nullifyEmptyStringVals = server.nullifyEmptyStringVals

  process.on("unhandledRejection", function(reason, p){
      throw new Error(reason.stack);
  }); 

  
  var models = require("./server/models.js")(_)
  server.sequelize = models.sequelize
  server.ORM = models.ORM
  server.Models = models.Models
  server.Auth = require("./server/auth.js")(server)

  var newExpressApp = server.newExpressApp = function(httpServer, server) {
    var express = require('express')
    var expressApp = express()
    expressApp = require("./server/expressConfig.js")(expressApp, express)
    expressApp = require("./server/routes.js")(expressApp, server)
    return expressApp
  }

  var newHttpServer = server.newHttpServer = function() {
    return require("http").createServer()
  }

  var newWebsocketServer = server.newWebsocketServer = function(httpServer) {
    var WsServerInit = require('ws').Server
    var WsServer = new WsServerInit({ server: httpServer })
    return require("./server/websockets.js")(WsServer, server)
  }
  
  var startServer = function(server) {
    console.log("starting server".green)
    var HttpServer = newHttpServer()
    var WebsocketServer = newWebsocketServer(HttpServer)
    var expressApp = newExpressApp(HttpServer, server)
    HttpServer.on('request', expressApp);
    var url = require('url')    
    // to include port as an argument variable,
    // the script must be run as "nodejs main.js",
    // not npm start or scripts/start
    var port = process.argv[2] || 4080
    HttpServer.listen(port, function () {
      console.log(`Listening on ${HttpServer.address().port}`.green)
    })
    return {
      HTTP: HttpServer, Websocket: WebsocketServer, express: expressApp,
      url: url, port: port
    }
  }

  // ------------------------------
  // The method which starts it all
  // ------------------------------

  var begin = function(startFromREPL) {
    var server = this;
    return server.Models.syncModels(server.ORM).then(function(){
      console.log("synced models".green)
      if ((require.main === module) || startFromREPL) {
        console.log("executed directly".green)
        startServer(server)
      } else {
        console.log("required as a module".green)
        console.log("loading REPL".green)
        server._ = _ // exports Underscore to REPL
        console.log("to enable colors: require('colors')".rainbow)
      }
      return Promise.resolve(server)
    })
  }.bind(server)
  
  server.begin = begin
  
  begin().then(function(server){
    return callback(server)
  }).catch(server.debug)
}

if (require.main === module) {
  server(function(){})
}
