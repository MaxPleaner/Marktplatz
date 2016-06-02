// NPM dependencies
global._ = require("underscore")
global = _.extend(global, {
  server: require("http").createServer(),
  url: require('url'),
  WebSocketServer: require('ws').Server,
  express: require('express'),
  port: 4080,
  Sequelize: require("sequelize"),
  app: {},
  appHelpers: {},
})
global.wss = new WebSocketServer({ server: server })
global.expressApp = express()

// App dependencies
require("./app/models.js") // defines app.sequelize, app.Models and app.ORM

appHelpers.startServer = function() {
  require("./app/routes.js") // adds routes to expressApp
  server.on('request', expressApp);
  server.listen(port, function () {console.log('Listening on ' + server.address().port) });
}

app.Models.syncModels(function(){
  // app.Models.User.inspect()
  appHelpers.startServer()
})

  // if (require.main === module) {
  //     // meaning if this script is called directly
  //     process.exit();
  // } else {
  //     // meaning if the script was required elsewhere
  // }
  