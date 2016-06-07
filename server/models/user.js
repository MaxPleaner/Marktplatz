module.exports = function(sequelize, Sequelize, _) {

  var userORM = sequelize.define("user", {
    username: {type: Sequelize.STRING, fieldName: "username"},
    sessionToken: {type: Sequelize.STRING}
  }, {freezeTableName: false, force: true})

  var userModel = function(_, userORM) {

    this._ = _

    this.crypto = require('crypto'),
    this.cryptoAlgorithm = 'aes-256-ctr',
    this.cryptoGlobalPassword = process.env.CryptoGlobalPassword;
    this.cipher = this.crypto.createCipher(
      this.cryptoAlgorithm, this.cryptoGlobalPassword
    )
    this.decipher = this.crypto.createDecipher(
      this.cryptoAlgorithm, this.cryptoGlobalPassword
    )
    
    this.errors = []

    this.find = function(params) {
      var params = this._.extend({}, params) // a shallow clone
      delete params.password
      return new Promise(function(resolve, reject) {
        return userORM.findAll({where: params}).then(function(users){
          if (users.length > 0) {
            resolve(users)
          } else {
            this.errors.push("no users found")
            reject(this.errors)
          }   
        }.bind(this))
      }.bind(this))
    }

    this.findOne = function(params) {
      return new Promise(function(resolve, reject) {
        return this.find(params).then(function(users){
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
        var userRecord = this.findOne(params).then(function(user){
          var loginOK = this.isCorrectPassword(user, params.password)
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
      return new Promise(function(resolve, reject) {
        console.log(this.findOne(params))
        console.log("...")
        this.findOne(params).then(function(){
          this.errors.push(
            "cannot register, this user already exists"
          )
          reject(this.errors)
        }.bind(this), function(){
          if (this.invalidPassword(params.password)) {
            this.errors.push("password is not 6-50 characters")
            reject(this.errors)
          }
          console.log(params)
          console.log(params.password)
          var password =  this.encryptPassword(params.password)
          params.sessionToken = this.newSessionToken();
          console.log(`params.sessionToken - ${params.sessionToken}`)
          UserORM.create(params).then(function(user){
            resolve(user)
          })
        }.bind(this))
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

    this.invalidPassword = function(password){
      return !password || (password.length < 6) ||
      (password.length > 50)
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

    this.encryptPassword = function(password){
      var crypted = this.cipher.update(password,'utf8','hex')
      crypted += cipher.final('hex');
      return crypted;
    }

    this.decryptPassword = function(passwordHash) {
      var dec = this.decipher.update(text,'hex','utf8')
      dec += decipher.final('utf8');
      return dec;
    }

    this.isCorrectPassword = function(user, password) {
      return user.password == this.decryptPassword(password) 
    }

    this.newSessionToken = function() {
      return "123456789"
    }

  }


  return {
    Models: { User: new userModel(_, userORM) },
    ORM: { User: userORM },
  }

}

 