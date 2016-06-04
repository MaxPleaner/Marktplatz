module.exports = {
  login: function(params) {
    return Promise(function(resolve, reject) {
      params.username ?  resolve() : reject()
    })
  },
  register: function(params) {
    return Promise(function(resolve, reject) {
      params.username ?  resolve() : reject()
    })
  },
}
