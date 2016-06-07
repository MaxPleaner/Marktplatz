RequestObjects = module.exports = {}

RequestObjects.userParams = function(params) {
  return {
    sessionToken: params.sessionToken,
    username: params.username,
    password: params.password,
    password_confirmation: params.password_confirmation,
    email: params.email,
  }
}