module.exports = function(expressApp, server) {

  var Models = server.Models
  var ORM = server.ORM

  var Auth = server.Auth
  var requestObjects = require("./request_objects.js")
  var userParams = requestObjects.userParams

  expressApp.post("/register", function(req, res){
    ORM.User.create({firstName: "asd"}).then(function(user){
      Auth.register(userParams(req)).then(function(user){
        // req.session.sessionToken = user.sessionToken
        res.send({user: user})
      }).catch(function(errors){
        res.send({errors: errors})
      })
    })
  })

  expressApp.post("/login", function(req, res){
    Auth.login(userParams(req)).then(function(user){
      // req.session.sessionToken = user.sessionToken
      res.send({user: user})
    }).catch(function(errors){
      res.send({errors: errors})
    })    
  })

  expressApp.get("/", function(req, res){
    res.render("views/index.ejs", { session: {} })
  })

  return expressApp

}
