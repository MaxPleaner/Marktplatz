var Auth = module.exports = function(server) {
    
  var server = server

  this.login = function (params) {
    return Promise.all([params, server.Models.User.login(params)])
  }

  this.logout = function (params) {
    return Promise.all([params, server.Models.User.logout(params)])
  }

  this.register = function (params) {
    return Promise.all([params, server.Models.User.register(params)])
  }

  return this

}
