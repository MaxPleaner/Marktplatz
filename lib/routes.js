export default class Routes {

  addRoutesToApp(appComponents) {
    var app = appComponents.app
    app.use(function (req, res) {
      res.send({ msg: "hello" });
    });
    return app;
  }

  inspect() {
    return `\n
      Routes
        * => 'hello'
    `
  }

}


