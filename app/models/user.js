var user = app.sequelize.define("user", {
  firstName: {type: Sequelize.STRING, field: "first_name"},
  lastName: {type: Sequelize.STRING},
}, {freezeTableName: true})

app.Models.User = exports = {}
app.ORM.User = user

app.Models.User.inspect = function() {
  var user = app.ORM.User.create({
    firstName: 'John',
    lastName: 'Hancock'
  }).then(function(u){
    app.ORM.User.findOne().then(function(newUser){
      console.log(newUser.firstName)
    });
  })
}

