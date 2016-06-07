### How to run this

Note that all the following commands should be run from within the repo's root directory. In other words, don't `cd` anywhere else before running them. 

First go to `scripts/env_setup.sh.example` and fill in the required environment variables. Then remove the `.example` from the extension. This file is in `.gitignore`.

There are two ways to start the server:
- using babel to compile. Use `scripts/compile_and_run` to do this.
- using Node without compilation. `npm start` accomplishes this, or `nodejs main.js`. To do this, the installed Node version must be modern enough to support ES6 features (promises, arrow functions, template strings, etc). I'm using Node `5.11.1`.

The app can be loaded into a REPL using `scripts/console`. All the app's code is namespaced under `server`, which is available as a variable in the REPL. See `scripts/console` for other available variables (everything defined on the `context` object.)

`babel_node` can also load the app into a REPL using `scripts/babel_repl`.


----

I was learning about various elements of Node when building this.

One thing that took a lot of effort was Promises.

There's a couple specific things regarding promises that I think it's useful to keep in mind:

1. The general principle is to have functions return `new Promise(function(resolve, reject){ ... function body ... })` and then in the function block call `resolve` or `reject`. The thing that was tricky for me to realize was that all promises written with this Syntax need to _explicitly_ call `resolve` and `reject` at some point in their function body. For example, if a Promise's function block calls another asynchronous function, it is not _inferred_ that the current `resolve` and `reject` blocks will be _passed on_ to the nested function. In fact, this will _not_ happen. Instead, when nesting promises, it's necessary to call `then` and `catch` on the inner promise and in _those_ callbacks, call the _original_ `resolve` and `reject`.

