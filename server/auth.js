var Auth = module.exports = function(server) {
  
  this.Models = server.Models

  this.login = function (params) {
    var Models = this.Models
    return Models.User.find(params).then(function(user) {
      return Promise.all([user, Models.User.login(user)])
    })
  }

  this.logout = function (params) {
    var Models = this.Models
    return Models.User.find(params).then(function(user) {
      return Promise.all([user, Models.User.logout(user)])
    })
  }

  this.register = function (params) {
    var Models = this.Models
    return Models.User.find(params).then(function(user) {
      return Promise.all([user, Models.User.register(user)])
    })
  }

  return this

}
