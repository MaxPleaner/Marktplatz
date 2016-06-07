var server = module.exports = function(callback) {

  require("colors")
  var _ = require("underscore")


  // process.on("unhandledRejection", function(reason, p){
      // console.log("Unhandled", reason, p); // log all your errors, "unsuppressing" them.
      // throw new Error(reason); // optional, in case you want to treat these as errors
  // }); 

  // Remember to edit /server/env_vars.js before starting
  process.env = _.extend(process.env, require("./server/env_vars.js"))
  
  var server = {}
  var models = require("./server/models.js")(_)
  server.sequelize = models.sequelize
  server.ORM = models.ORM
  server.Models = models.Models
  server.Auth = require("./server/auth.js")(server)

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
  // The method which starts it all
  // ------------------------------

  var begin = function(startFromREPL) {
    var server = this;
    return new Promise(function(resolve, reject) {
      server.Models.syncModels(server.ORM).then(function(){
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
        return resolve(server)
      })
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
  
// ------------------------------
//
// ------------------------------

//server.js or whatever
//var express = require('express')
//var app = express()
//var server = require('http').Server(app)

//app.use(express.static('site'))

//module.exports = server;

//main.js
//var server = require('./server')
//var connectWebScoket = require('./ws')

//server.listen(pot, function() {
//  connectWebSocket(port)
//  startSync(server)
//})

//connectWebSocket.js
//var 


//models/sequelize.js
//module.exports = function (postgresUrl) {
// Sequelize.connect(postgresUrl)
// return this;
//}


//models/sequelize

// module.exports = function("user", sequelize) sequelize.define("user", {
//     username: {type: Sequelize.STRING, fieldName: "username"},
//     sessionToken: {type: Sequelize.STRING}
//   }, {freezeTableName: false, force: true})

//constants or deps.js
//export.sequelize = require('')

