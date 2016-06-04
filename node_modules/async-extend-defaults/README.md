async.extend & async.defaults
=========

Simple ```async``` function to extend or defaults object.
Extends [async](https://github.com/caolan/async) module.

## Install

If you use in your project any other async function from [async](https://github.com/caolan/async) module (of course you are  :)  ),
please make sure that you install ```async``` module into your node_modules.
It is desirable to use in your project one instance of ```async``` module. Read about [Node.JS Folders and Modules](http://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)
dependencies.

```
npm install async

npm install async-extend-defaults
```

##Usage

```javascript
var asyncExtend = require('async-extend-defaults').extend
var asyncDefaults = require('async-extend-defaults').defaults

var extendableObject = {deep: {yes: true}, one: 1}

asyncExtend(
    extendableObject,
    {two: 2},
    {deep: {yes: 'it is'}},
    function (extended) {
        console.log(extended === extendableObject) // true

        console.log(extended) // {deep: {yes: 'it is'}, one: 1, two: 2}
    }
)


var defaultsObject = {deep: {yes: true}, one: 1}

asyncDefaults(
    defaultsObject,
    {one: 'no'},
    {two: 2},
    {deep: {yes: 'it is'}},
    function (options) {
        console.log(options === defaultsObject) // true

        console.log(options) // {deep: {yes: true}, one: 1, two: 2}
    }
)
```

If you want async clone object then you can do:
```javascript
var asyncExtend = require('async-extend-defaults').extend

asyncExtend({}, sourceObject, function (clone) {})
```

If you have installed ```async``` module, and install ```async-extend-defaults``` after ```async```, you can use module like this:
```javascript
// Order is not important
var async = require('async')

// Require once in project
require('async-extend-defaults')

// extend and defaults function extends async
async.extend()
async.defaults()
```

## License

(MIT License)
