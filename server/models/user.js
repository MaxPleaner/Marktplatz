module.exports = function(sequelize, Sequelize) {
  
  var userORM = sequelize.define("user", {
    firstName: {type: Sequelize.STRING, field: "first_name"},
    lastName: {type: Sequelize.STRING},
  }, {freezeTableName: true})

  var userModel = function(userORM) {
    this.user = userORM
    this.find = function(params) {
      var password = params.password
      delete params.password
      return new Promise(function(resolve, reject) {
        Model.findAll({where: params}).then(function(users){
          resolve(users)
        }).catch(function(errors){
          reject(errors)
        });
      })
    }
    
    this.login = function(user) {
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
    Models: { User: userModel },
    ORM: { User: userORM },
  }

}

 