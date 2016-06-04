expressApp.post("/register", function(req, res){
  res.send({message: req.body.message})
})

expressApp.post("/login", function(req, res){
  
})

expressApp.get("/", function(req, res){
  res.render("test.ejs", { layout: "layout"})
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