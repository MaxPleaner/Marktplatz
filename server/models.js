var Models = module.exports = function(){

  var Sequelize = require("sequelize")
  var databaseUrl = `\
postgres://\
${process.env.POSTGRES_USERNAME}\
:${process.env.POSTGRES_PASSWORD}\
@localhost:5432\
/${process.env.POSTGRES_DB_NAME}
  `
  var sequelize = new Sequelize(databaseUrl)
  var Models = {}
  var ORM = {}

  var user = require("./models/user.js")(sequelize, Sequelize)
  Models.User = user.Models.User
  ORM.User = user.ORM.User

  Models.syncModels = function(ORM) {
    return new Promise(function (resolve, reject) {
      ORM.User.sync({force: false}).then(function(){
        resolve()
      })
    })
  }

  return {
    sequelize: sequelize, 
    ORM: ORM,
    Models: Models
  }

}()



