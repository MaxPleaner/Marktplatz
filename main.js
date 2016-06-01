// Objects are required from dependencies
    var server = require('http').createServer()
      , url = require('url')
      , WebSocketServer = require('ws').Server
      , wss = new WebSocketServer({ server: server })
      , express = require('express')
      , app = express()
      , port = 4080
      , _ = require('underscore');

// Objects are shared with modules in /lib by passing them as arguments
    var appComponents = {
      url: url,
      WebSocketServer: WebSocketServer,
      wss: wss,
      app: app,
      port: port
    };

// Routes using Express.js
    import Routes from "./lib/routes.js";
    var routes = new Routes();
    app = routes.addRoutesToApp(appComponents);

// Debugging statements
  /* Routes */ console.log(routes.inspect());

// Start server
    // server.on('request', app);
    // server.listen(port, function () { console.log('Listening on ' + server.address().port) });

