### Usage

run `./scripts/start`

_To avoid package inconsistencies, the command in `./scripts/start` should be used to start the app instead of just `babel-node main.js`.

Which brings me to another point: how this app is constructed.

The server is `express`.

The language is ES6.

The build process:

  - To load modules, the `System.import` command from `es6-module-loader` is used.
  - `babel-plugin-transform-dirname-filename` is used to enable `__filename` to be used in pre-compiled files.
  - This combination of tools has the benefit of allowing relative paths to be used when requiring files.

How to run the app:

  - Run the `./start` script. All this does is run the following two scripts in succession:
    - `./scripts/compile`
    - `./scripts/run_compiled_app`
  - The `start` script will exit with an error unless the `RootDir` environment variable is set. Either export the variable or run the script with  

```sh
RootDir=`pwd` ./start`
```

There are also `./scripts/compile` and `./scripts/run_compiled_app`, which can be used to separate the compile/run build step. This probably also offers a performance benefit to running the app.

- Websockets: `ws` library



