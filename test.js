(function() 1{
  global = this
  global.foo = "foo"

  (function() {
  global = this
  console.log("ok")
  global.foo = "bar"
  console.log(foo)
  })()

  // console.log(foo)
})()

// console.log(foo)
