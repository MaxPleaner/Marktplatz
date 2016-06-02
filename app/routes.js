expressApp.use(function (req, res) {
  app.ORM.User.destroy({
    truncate: true /* this will ignore where and truncate the table instead */
  }).then(function(users){
    res.send({
      msg: _.map(users, (user) => JSON.stringify(user.get({plain: true}))).join()
    });
  })
});
