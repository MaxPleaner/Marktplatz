### How to run this

Note that all the following commands should be run from within the repo's root directory. In other words, don't `cd` anywhere else before running them. 

First go to `scripts/env_setup.sh.example` and fill in the required environment variables. Then remove the `.example` from the extension. This file is in `.gitignore`.

There are two ways to start the server:
- using babel. Use `scripts/compile_and_run` to do this.
- using Node (no compilation). `npm start` accomplishes this, or `nodejs main.js`.

The app can be loaded into a REPL using `scripts/console`.
`babel_node` can also load the app into a REPL using `scripts/babel_repl`.

