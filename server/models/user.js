module.exports = function(sequelize, Sequelize) {
  
  var userORM = sequelize.define("user", {
    firstName: {type: Sequelize.STRING, field: "first_name"},
    lastName: {type: Sequelize.STRING},
  }, {freezeTableName: true})

  function userModel(userORM) {
    this.user = userORM
  }

  return {
    Models: { User: userModel },
    ORM: { User: userORM },
  }

}

 