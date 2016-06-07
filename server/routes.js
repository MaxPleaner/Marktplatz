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

  expressApp.post("/register", function(req, res){
    Auth.register(userParams(params(req)))
      .then(function(user){
        req.session.sessionToken = user.sessionToken
        res.send({user: user})
      })
      .catch(function(errors){
        res.send({errors: errorString(errors)})
      })
  })

  expressApp.post("/login", function(req, res){
    Auth.login(userParams(params(req)))
      .then(function(user){
        req.session.sessionToken = user.sessionToken
        res.send({user: user})
      })
      .catch(function(errors){
        res.send({errors: errorString(errors)})
      })    
  })

  expressApp.get("/", function(req, res){
    res.render("views/index.ejs", { session: {} })
  })

  return expressApp

}
