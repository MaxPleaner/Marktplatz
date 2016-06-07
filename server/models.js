var Models = module.exports = function(_){

  var Sequelize = require("sequelize")
  var databaseUrl = `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB_NAME}
  `
  var sequelize = new Sequelize(databaseUrl)
  var Models = {}
  var ORM = {}

  var user = require("./models/user.js")(sequelize, Sequelize, _)
  Models.User = user.Models.User
  ORM.User = user.ORM.User

  Models.syncModels = function(ORM) {
    return Promise.all([null, ORM.User.sync({force: true})])
  }

  return {
    sequelize: sequelize, 
    ORM: ORM,
    Models: Models,
  }

}



