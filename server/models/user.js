module.exports = function(sequelize, Sequelize, _) {

  var bcrypt = require("bcrypt")

  var userORM = sequelize.define("users", {
    profileText: {
      type: Sequelize.STRING,
    },
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
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1,255]
      }
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
        len: [1,50]
      }
    },
  }, {
    freezeTableName: false,
    instanceMethods: {
      authenticate: function(value){
        if (bcrypt.compareSync(value, this.password_digest))
          return this;
        else
          return false;
      }
    }
  })

var hasSecurePassword = function(user, options, callback) {
  if (user.password != user.password_confirmation) {
    throw new Error("Password confirmation doesn't match Password");
  }
  bcrypt.hash(user.get('password'), 10, function(err, hash) {
    if (err) return callback(err);
    user.set('password_digest', hash);
    return callback(null, options);
  });
};

userORM.beforeCreate(function(user, options, callback) {
  if (user.email) { user.email = user.email.toLowerCase() }
  if (user.password)
    hasSecurePassword(user, options, callback);
  else
    return callback(null, options);
})
userORM.beforeUpdate(function(user, options, callback) {
  if (user.email) { user.email = user.email.toLowerCase() }
  if (user.password)
    hasSecurePassword(user, options, callback);
  else
    return callback(null, options);
})


  var userModel = function(_, userORM) {

    var crypto = require('crypto')
    var _ = _
    this.userORM = userORM
    
    this.find = function(params) {
      var params = _.extend({}, params) // a shallow clone
      var params = this.publicAttrs(params) // sanitize
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
          .catch(function(e){return reject("User not found")})
      }.bind(this))
    }

    this.login = function(params) {
      return new Promise(function(resolve, reject) {
        return this.findOne(params)
          .then(function(user){
            if (user.authenticate(params.password)) {
              var sessionToken = this.newSessionToken()
              return user.updateAttributes({
                  sessionToken: sessionToken
              })
              .then(function(user){
                return resolve(this.publicAttrs(user))
              }.bind(this))
              .catch(function(err){return reject(err)})
            } else {
              return resolve("incorrect password")
            }
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
            }.bind(this))
          .catch(
            function(err){
              return this.userORM.create(params)
                .then(function(user){
                  var sessionToken = this.newSessionToken();
                  return user.updateAttributes({sessionToken: sessionToken})
                    .then(function(){
                      return resolve(this.publicAttrs(user))
                    }.bind(this))
                    .catch(function(err){return reject(err)})
                }.bind(this))
                .catch(function(err){return reject(err)})
            }.bind(this)
          )
      }.bind(this))
    }

    this.logout = function(user) {
      return this.setNullSession(user)
    }

    this.publicAttrs = function(user) {
      var user = _.extend({}, user.dataValues)
      delete user.password
      delete user.password_confirmation
      delete user.password_digest
      return user
    }

    this.setNullSession = function(user){
      if (user) {
        return user.updateAttributes({sessionToken: undefined})
      } else {
        return Promise.reject("could not null session on undefined user")
      }
    }

    this.newSessionToken = function() {
      var sha = crypto.createHash("sha256");
      sha.update(Math.random().toString());
      return sha.digest("hex");
    }

  }

  return {
    Models: { User: new userModel(_, userORM) },
    ORM: { User: userORM },
  }

}

 