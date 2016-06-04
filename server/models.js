var Sequelize = require("sequelize")

var Models = exports = {}

var databaseUrl = `\
postgres://\
${process.env.POSTGRES_USERNAME}\
:${process.env.POSTGRES_PASSWORD}\
@localhost:5432\
/${process.env.POSTGRES_DB_NAME}
`
server.sequelize = new Sequelize(databaseUrl)
server.ORM = {}

require("./models/user.js") // defines server.Models.User and server.ORM.User

server.Models.syncModels = () => {
  return new Promise(function (resolve, reject) {
    server.ORM.User.sync({force: false}).then(function(){
      resolve()
    })
  })
}

