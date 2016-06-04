var Auth = module.exports = function(server) {
  
  var Models = server.Models

  this.login = function (params) {
    return new Promise(function(resolve, reject) {
      Models.User.find(params).then(function(user) {
        Models.User.login(user).then((user) => { resolve(user) })
      }).catch(function(errors) {
        reject("find/login error")
      })
    })
  }

  this.logout = function (params) {
    return new Promise(function(resolve, reject) {
      Models.User.find(params).then(function(user) {
        Models.User.logout(user).then((user) => { resolve(user) })
      }).catch(function(errors) {
        reject("find/logout error")
      })
    })
  }


  this.register = function (params) {
    return new Promise(function(resolve, reject) {
      Models.User.find(params).then(function(user) {
        Models.User.register(user).then((user) => { resolve(user) })
      }).catch(function(errors) {
        reject(errors)
      })
    })
  }

  return this

}
