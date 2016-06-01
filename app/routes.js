var Routes = exports;

Routes.addRoutesToApp = function(appComponents) {
  var app = appComponents.app
  app.use(function (req, res) {
    res.send({ msg: "hello" });
  });
  return app;
}

Routes.inspect = function() {
  return `\n
    Routes
      * => 'hello'
  `
}



