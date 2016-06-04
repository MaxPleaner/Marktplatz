// NPM dependencies
require("colors")
global._ = require("underscore")
global = _.extend(global, {
  Sequelize: require("sequelize"),
  app: {},
  appHelpers: {},
})

// Load some environment variables into process.env
require("./server/env_vars.js")
console.log("loaded env vars from server/env_vars.js".green)

// App dependencies
// defines app.sequelize, app.Models, and app.ORM
require("./server/models.js")

// Server connfiguration and routes
// Defines routes on the expressApp object
appHelpers.addRoutesToExpressApp = function(){
  require("./server/expressConfig.js")
  require("./server/routes.js")
}

// Function to start the server
// Loads more NPM dependencies
appHelpers.startServer = function() {
  global.server = require("http").createServer(),
  global.WebSocketServer = require('ws').Server,
  global.wss = new WebSocketServer({ server: server })
  global.url = require('url'),
  global.port = 4080,
  global.express = require('express'),
  global.expressApp = express()
  appHelpers.addRoutesToExpressApp()
  server.on('request', expressApp);
  server.listen(port, function () {
    console.log(`Listening on ${server.address().port}`.green) 
  });
}

// Start server after syncing (finalizing) models
app.Models.syncModels().then(function(){
  console.log("synced models".green)
  if (require.main === module) { // meaning if this script is called directly
    console.log("starting server".green)
    appHelpers.startServer()
  } else {
    console.log("starting REPL".green)
    var repl = require("repl")
    var context = repl.start("> ").context
    context.util = require("util")
  }
})