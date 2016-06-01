'use strict';

__dirname = '/home/max/Desktop/node-ws';
// Module loading system
// This, along with babel-transform-dirname-filename
// enables relative paths when loading files.
var System = require('es6-module-loader').System;

// Objects are required from dependencies
var server = require('http').createServer(),
    url = require('url'),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: server }),
    express = require('express'),
    app = express(),
    port = 4080,
    _ = require('underscore');

// Objects are shared with modules in /app by passing them as arguments
var appComponents = {
  url: url,
  WebSocketServer: WebSocketServer,
  wss: wss,
  app: app,
  port: port
};

// Routes using Express.js
System.import(__dirname + "/app/routes.js").then(function (routes) {
  var routes = new Routes();
  app = routes.addRoutesToApp(appComponents);
  /* Routes */console.log(routes.inspect());
});
// import Routes from "./app/routes.js";

// Debugging statements

// Start server
// server.on('request', app);
// server.listen(port, function () { console.log('Listening on ' + server.address().port) });
