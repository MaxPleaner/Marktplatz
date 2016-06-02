
expressApp.use(function (req, res) {
  app.Models.User.findOne(function(user){
    res.send({ msg: user.firstName });
  })
});
