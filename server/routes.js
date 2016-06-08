module.exports = function(expressApp, server) {

  var Models = server.Models
  var ORM = server.ORM

  var Auth = server.Auth
  var requestObjects = require("./request_objects.js")
  var userParams = requestObjects.userParams

  var _ = server._
  var nullifyEmptyStringVals = server.nullifyEmptyStringVals

  var params = function(req) {
    return nullifyEmptyStringVals(req.body)
  }

  var errorString = function(errorObject) {
    if (errorObject.errors) {
      var errors = errorObject.errors
      return _.map(errors, function(err){ return err.message })
    } else if (errorObject.message) {
      return [errorObject.message]
    } else { return [errorObject] }
  }

  var renderIndex = function(req, res, user) {
    res.render("views/index.ejs", { session: req.session, user: user })
  }

  expressApp.post("/register", function(req, res){
    Auth.findCurrentUser(req)
    .then(function(user){
      res.send({errors: "cant register: already logged in"})
    })
    .catch(function(err){
      Auth.register(userParams(params(req)))
      .then(function(user){
        req.session.sessionToken = user.sessionToken
        res.redirect("/")
      })
      .catch(function(errors){
        console.log(errorString(errors))
        res.send({errors: errorString(errors)})
      })
    })
  })

  expressApp.post("/login", function(req, res){
    Auth.findCurrentUser(req)
    .then(function(user){
      res.send({errors: "can't log in: already logged in"})
    })
    .catch(function(err){
      Auth.login(userParams(params(req)))
      .then(function(user){
        req.session.sessionToken = user.sessionToken
        res.redirect("/")
      })
      .catch(function(errors){
        res.send({errors: errorString(errors)})
      })
    })
  })

  expressApp.post("/logout", function(req, res){
    var currentUser = Auth.findCurrentUser(req)
    var loggedOutUser = currentUser.then((user) => { return Auth.logout(user) })
    loggedOutUser
    .then(function(user) {
      delete req.session.sessionToken
      res.redirect("/")
    })
    .catch(function(errors) { res.send({errors: errorString(errors)}) })
  })

  expressApp.get("/", function(req, res){
    Auth.findCurrentUser(req)
    .then(function(user){ console.log(user.profileText);renderIndex(req, res, user) })
    .catch(function(err){ renderIndex(req, res, false) })
  })

  return expressApp

}
