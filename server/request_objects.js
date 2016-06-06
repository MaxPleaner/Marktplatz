RequestObjects = module.exports = {}

RequestObjects.userParams = function(req) {
  return {
    sessionToken: req.session.sessionToken,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }
}