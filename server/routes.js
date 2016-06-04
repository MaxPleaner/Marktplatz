var requestObjects = require(".server/request_objects.js")

expressApp.post("/register", function(req, res){
  app.Models.User.register(requestObjects.userParmas(req)).then(function(user){
    res.send({user: user})
  }).catch(function(errors){
    res.send({errors: errors})
  })
})

expressApp.post("/login", function(req, res){
  
})

expressApp.get("/", function(req, res){
  res.render("index.ejs", { session: session })
})

// expressApp.use(function (req, res) {
//   app.ORM.User.destroy({
//     truncate: true /* this will ignore where and truncate the table instead */
//   }).then(function(users){
//     res.send({
//       msg: _.map(users, (user) => JSON.stringify(user.get({plain: true}))).join()
//     });
//   })
// });