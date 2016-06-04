RequestObjects = module.exports = {}

RequestObjects.userParams = function(req) {
  return {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }
}