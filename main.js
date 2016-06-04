// Global namespace
var MP = exports = {}

// First-things-first NPM dependencies
var _ = require("underscore")
MP = _.extend(MP, {
  _: _,
  deepExtend: require("deep-extend")
  colors: require("colors"),
  Sequelize: require("sequelize")
})

// Objects for custom code
MP = MP._.extend(MP, {
  app: {},
  appHelpers: {}  
})

// Load some environment variables into process.env
MP = MP._.extend(MP, {
  env: require("./server/env_vars.js")
})

// Load up model-related stuff
var models = require("./server/models.js")(MP)
MP = MP.deepExtend(MP, {
  app: {
    sequelize: models.sequelize,
    Models: models.Models,
    ORM: models.ORM
  }
})

// Load up server stuff
MP.appHelpers.startServer = function(MP){
  MP.server = require("http").createServer()
  MP.WebSocketServer = require('ws').Server,
  MP.express = require('express')
  MP.expressApp = express()
  return MP.deepExtend(MP, {
    url: require('url'),
    wss: new MP.WebSocketServer({ server: MP.server }),
    port: 4080,
    expressApp: require("./server/routes.js")(
      require("./server/expressConfig.js")(MP.expressApp)
    ),
    server: (function(){
      var server = MP.server;
      server.on("request", expressApp);
      server.listen(port, function () {
        console.log(`Listening on ${server.address().port}`.green) 
      });
      return server
    })(),
  })
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