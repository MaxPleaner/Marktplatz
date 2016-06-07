### How to run this

Note that all the following commands should be run from within the repo's root directory. In other words, don't `cd` anywhere else before running them. 

First go to `scripts/env_setup.sh.example` and fill in the required environment variables. Then remove the `.example` from the extension. This file is in `.gitignore`.

There are two ways to start the server:
- using babel to compile. Use `scripts/compile_and_run` to do this.
- using Node without compilation. `npm start` accomplishes this, or `nodejs main.js`. To do this, the installed Node version must be modern enough to support ES6 features (promises, arrow functions, template strings, etc). I'm using Node `5.11.1`.

The app can be loaded into a REPL using `scripts/console`. All the app's code is namespaced under `server`, which is available as a variable in the REPL. See `scripts/console` for other available variables (everything defined on the `context` object.)

`babel_node` can also load the app into a REPL using `scripts/babel_repl`.

