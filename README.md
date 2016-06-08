## How to run this

_Note that all the following commands should be run from within the repo's root directory. In other words, don't `cd` anywhere else before running them._

1. Go to `scripts/env_setup.sh.example` and fill in the required environment variables. Then remove the `.example` from the extension. This file is in `.gitignore`.
2. Start the server: there are two ways to do this:
  1. using babel to compile. Use `scripts/compile_and_run` to do this.
  2. using Node without compilation. `npm start` accomplishes this, or `nodejs main.js`. To do this, the installed Node version must be modern enough to support ES6 features (promises, arrow functions, template strings, etc). I'm using Node `5.11.1`.
3. The app can be loaded into a REPL using `scripts/console`. All the app's code is namespaced under `server`, which is available as a variable in the REPL. See `scripts/console` for other available variables (everything defined on the `context` object.)
4. `babel_node` can also load the app into a REPL using `scripts/babel_repl`.


## How code is organized
  - `client/`
    - `public/bower_components/` _client-side package manager_
    - `views/`
      - `auth/` _components of the login page_
      - `auth.ejs` _the login page_
      - `authenticated.ejs` _the post-login page. Also contains DOM-related Javscript_
      - `index.ejs` _wrapper for other pages_
      - `websockets.ejs` _websocket code, not initialized until login_
    - `layout.ejs` _layout template_
  - `compiled/` _destination for code transpiled by Babel_
  - `node_modules/` _all NPM depenencies are fully present in this folder. No need to `npm install`_
  - `scripts/` _shell scripts_
    - `lib/` _helpers, no need to execute these_
    - `babel_repl` _Starts a REPL using `babel-node`_ 
    - `compile` _Compiles the app using Babel`
    - `compile_and_run` _Combines `compile` and `run_compiled_app` scripts_
    - `console` _Loads a REPL for the app using Node_
    - `run_compiled_app` _Runs the server from `compiled/`_
    - `start` _Starts the server with Nodejs_
  - `server/` 
    - `models/`
    - `auth.js`
    - `env_vars.js.example`
    - `expressConfig.js`
    - `models.js`
    - `request_objects.js`
