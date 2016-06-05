module.exports = function(sequelize, Sequelize) {
  
  var userORM = sequelize.define("user", {
    firstName: {type: Sequelize.STRING, field: "first_name"},
    lastName: {type: Sequelize.STRING},
  }, {freezeTableName: true})

  var userModel = function(userORM) {

    this.find = function(params) {
      var password = params.password
      delete params.password
      return userORM.findAll({where: params})
    }
    
    this.login = function(user) {
      return new Promise(function(resolve, reject) {
        resolve(user)
      })
    }

    this.register = function(user) {
      return new Promise(function(resolve, reject) {
        resolve(user)
      })
    }

    this.logout = function(user) {
      return new Promise(function(resolve, reject) {
        resolve(user)
      })
    }

  }

  return {
    Models: { User: new userModel(userORM) },
    ORM: { User: userORM },
  }

}

 