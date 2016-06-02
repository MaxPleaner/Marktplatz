var user = app.sequelize.define("user", {
  firstName: {type: Sequelize.STRING, field: "first_name"},
  lastName: {type: Sequelize.STRING},
}, {freezeTableName: true})

app.Models.User = exports = {}
app.ORM.User = user
 