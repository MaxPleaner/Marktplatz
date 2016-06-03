global.app.Models = exports = {}

var databaseUrl = `\
postgres://\
${process.env.POSTGRES_USERNAME}\
:${process.env.POSTGRES_PASSWORD}\
@localhost:5432\
/${process.env.POSTGRES_DB_NAME}
`
app.sequelize = new Sequelize(databaseUrl)
app.ORM = {}

require("./models/user.js") // defines app.Models.User and app.ORM.User

app.Models.syncModels = () => {
  return new Promise(function (resolve, reject) {
    app.ORM.User.sync({force: false}).then(function(){
      resolve()
    })
  })
}

