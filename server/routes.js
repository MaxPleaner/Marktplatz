module.exports = function(expressApp, server) {

  var Models = server.Models
  var ORM = server.ORM

  var requestObjects = require("./request_objects.js")
  var userParams = requestObjects.userParams

  expressApp.post("/register", function(req, res){
    Models.User.register(userParams(req)).then(function(user){
      res.send({user: user})
    }).catch(function(errors){
      res.send({errors: errors})
    })
  })

  expressApp.post("/login", function(req, res){
    
  })

  expressApp.get("/", function(req, res){
    res.render("index.ejs", { session: session })
  })

  return expressApp

}
