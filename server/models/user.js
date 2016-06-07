module.exports = function(sequelize, Sequelize, _) {

  var bcrypt = require("bcrypt")

  var userORM = sequelize.define("users", {
    password_digest: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password_confirmation: {
      type: Sequelize.VIRTUAL
    },
    email: {
      type: Sequelize.STRING
    },
    sessionToken: {
      type: Sequelize.STRING,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
  }, {freezeTableName: false})

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

    this.userORM = userORM
    
    this.find = function(params) {
      var params = this._.extend({}, params) // a shallow clone
      delete params.password
      return new Promise(function(resolve, reject) {
        return this.userORM.findAll({where: params})
          .then(function(users){
            if (users.length > 0) {
              return resolve(users)
            } else {
              return reject("no users found")
            }   
          }.bind(this))
          .catch(function(err){return reject(err)})
      }.bind(this))
    }

    this.findOne = function(params) {
      return new Promise(function(resolve, reject) {
        return this.find(params)
          .then(function(users){
            return resolve(users[0])
          }.bind(this))
          .catch(function(e){return reject(e)})
      }.bind(this))
    }

    this.login = function(params) {
      return new Promise(function(resolve, reject) {
        var userRecord = this.findOne(params)
          .then(function(user){
            var sessionToken = this.newSessionToken()
            return 
              user.updateAttributes({
                sessionToken: sessionToken
              })
              .then(function(user){return resolve(user)})
              .catch(function(err){return reject(err)})
          }.bind(this))
          .catch(function(err){return reject(err)})
      }.bind(this))
    }

    this.register = function(params) {
      return new Promise(function(resolve, reject) {
        return this.findOne(params)
          .then(
            function(){
              return reject("user already exists")
            }.bind(this),
            function(err){
              return this.userORM.create(params)
                .then(function(user){return resolve(user)})
                .catch(function(err){return reject(err)})
            }.bind(this)
          )
          .catch(function(err){return reject(err)})
      }.bind(this))
    }

    this.logout = function(params) {
      return new Promise(function(resolve, reject) {
        return this.findOne(params)
          .then(function(user){
            return Promise.all([user, this.setNullSession(user)])
          }.bind(this))
          .catch(function(){
            return reject("could not find user to logout")
          }.bind(this))
      }.bind(this))
    }

    this.setNullSession = function(user){
      if (user) {
        return Promise.all([
          user, user.updateAttributes({sessionToken: undefined})
        ])
      } else {
        return Promise.reject("could not null session on undefined user")
      }
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

 