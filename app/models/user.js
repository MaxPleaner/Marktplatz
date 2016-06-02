var user = app.sequelize.define("user", {
  firstName: {type: Sequelize.STRING, field: "first_name"},
  lastName: {type: Sequelize.STRING},
}, {freezeTableName: true})

app.Models.User = exports = {}
app.ORM.User = user

app.Models.User.findOne = function(callback){
  var user = app.ORM.User.findOne().then(function(newUser){
    callback(newUser)
  })
}
