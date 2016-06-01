### Setup

To use a locally installed version of a package (similar to `bundle exec`), add the following alias:

`alias npm-exec='PATH=$(npm bin):$PATH $*'`

Which can then be used like `npm-exec babel-node` (to run a locally installed `babel-node` program).

### Usage

`npm-exec babel-node main.js`

Or alternatively run `./start`

