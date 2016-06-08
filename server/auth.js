var Auth = module.exports = function(server) {
    
  var server = server
  var Models = server.Models

  this.findCurrentUser = function(req) {
    var token = req.session.sessionToken 
    if (token) {
      return Models.User.findOne({sessionToken: token})
    } else {
      return Promise.reject("no current user")
    }
  }

  this.login = function (params) {
    return server.Models.User.login(params)
  }

  this.logout = function (loggedinUser) {
    return server.Models.User.logout(loggedinUser)
  }

  this.register = function (params) {
    return server.Models.User.register(params)
  }

  return this

}
