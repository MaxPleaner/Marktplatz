module.exports = function(sequelize, Sequelize) {
  
  var userORM = sequelize.define("user", {
    firstName: {type: Sequelize.STRING, field: "first_name"},
    lastName: {type: Sequelize.STRING},
    sessionToken: {type: Sequelize.STRING}
  }, {freezeTableName: true, force: true})

  var userModel = function(userORM) {
    
    this.errors = []

    this.find = function(params) {
      var password = params.password
      delete params.password
      return userORM.findAll({where: params}).then(function(users){
        if (users.length > 0) {
          resolve(users)
        } else {
          this.errors.push("no users found")
          reject(this.errors)
        }   
      }.bind(this))
    }

    this.findOne = function(params) {
      return new Promise(function(resolve, reject) {
        return find.then(function(users){
          if (users.length > 0) {
            resolve(users.first)
          } else {
            this.errors.push("no user found")
            reject(this.errors)
          }
        }.bind(this))
      }.bind(this))
    }
    
    this.login = function(params) {
      return new Promise(function(resolve, reject) {
        var password = params.password
        var userRecord = this.findOne(params).then(function(user){
          var loginOK = this.isCorrectPassword(user, password)
          if (loginOK) {
            var sessionToken = this.newSessionToken()
            return Promise.all([
              user,
              user.updateAttributes({
                sessionToken: sessionToken
              })
            ])
          } else {
            this.errors.push("incorrect password, cant login")
            reject(this.errors)
          }
        }.bind(this))
      }.bind(this))
    }

    this.register = function(params) {
      var password = params.password
      delete params.password
      var userRecord = this.findOne(params).then(function(){
        this.errors.push("cannot register, this user already exists")
        reject(this.errors)
      }.bind(this), function(){
        var password =  this.encryptPassword(password)
        params.sessionToken = this.newSessionToken();
        UserORM.create(params).then(function(user){
          resolve(user)
        })
      }.bind(this))
    }

    this.logout = function(params) {
      return new Promise(function(resolve, reject) {
        this.findOne(params).then(function(user){
          return Promise.all([user, this.setNullSession(user)])
        }.bind(this), function(){
          this.errors.push("could not find user to logout")
          reject(this.errors)
        }.bind(this))
      }.bind(this))
    }

    this.setNullSession = function(user){
      if (user) {
        return Promise.all([
          user, user.updateAttributes({sessionToken: undefined})
        ])
      } else {
        this.errors.push("could not null session on undefined user")
        Promise.reject(this.errors)
      }
    }

    this.newSessionToken = function() {
      return "123456789"
    }

  }


  return {
    Models: { User: new userModel(userORM) },
    ORM: { User: userORM },
  }

}

 