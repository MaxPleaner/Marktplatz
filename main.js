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
})
global.wss = new WebSocketServer({ server: server })
global.expressApp = express()

// App dependencies
require("./app/models.js") // defines app.sequelize, app.Models and app.ORM
require("./app/routes.js") // adds routes to expressApp

app.Models.syncModels(function(){
  app.Models.User.inspect()
})

  // Start server
  // server.on('request', expressApp);
  // server.listen(port, function () { console.log('Listening on ' + server.address().port) });
// })


  // if (require.main === module) {
  //     // meaning if this script is called directly
  //     process.exit();
  // } else {
  //     // meaning if the script was required elsewhere
  // }
  

  module.exports = {}
