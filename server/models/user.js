var user = server.sequelize.define("user", {
  firstName: {type: Sequelize.STRING, field: "first_name"},
  lastName: {type: Sequelize.STRING},
}, {freezeTableName: true})

server.Models.User = exports = {}
server.ORM.User = user
 