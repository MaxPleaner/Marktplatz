var Auth = module.exports = function(server) {
    
  var server = server

  this.login = function (params) {
    return Promise.all([params, server.Models.User.login(params)]) // returns a Promise
  }

  this.logout = function (params) {
    return Promise.all([params, server.Models.User.logout(params)]) // returns a Promise
  }

  this.register = function (params) {
    return Promise.all([params, server.Models.User.register(params)]) // returns a Promise
  }

  return this

}
