(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('better-curry', [], factory);
  } else {
    // Browser globals
    root.BetterCurry = factory();
  }
}(this, function (){
  'use strict';

  function slice() {
    var out = [], args, x, i, l = arguments.length, m, t = 0;
    for (x = 0; x < l; ++x) {
      args = arguments[x];
      m = args.length;
      for (i = 0; i < m; ++i) {
        out[t++] = args[i];
      }
    }
    return out;
  }

  function template(fn, len, context, args){
    var
      noContext = context === null,
      themArgs = [], outFn,
      instead = false;

    if (typeof args !== 'undefined' && args.length && (len > 0 || len === -1)) {
      themArgs = slice(args);

      var
        i = 0, rlen = themArgs.length;

      instead = function (xarg, index){
        themArgs[rlen + i++] = xarg;

        return themArgs[index];
      };
    }

    switch (len) {
      case 0:
        outFn = function zeroArgs(){
          return noContext ?
            fn()
            : fn.call(context);
        };
        break;
      case 1:
        outFn = function oneArg(arg1){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0)
          );
        };
        break;
      case 2:
        outFn = function twoArgs(arg1, arg2){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0) ,
              instead === false ? arg2 : instead(arg2, 1)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1)
          );
        };
        break;
      case 3:
        outFn = function threeArgs(arg1, arg2, arg3){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2)
          );
        };
        break;
      case 4:
        outFn = function fourArgs(arg1, arg2, arg3, arg4){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2),
              instead === false ? arg4 : instead(arg4, 3)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2),
            instead === false ? arg4 : instead(arg4, 3)
          );
        };
        break;
      case 5:
        outFn = function fiveArgs(arg1, arg2, arg3, arg4, arg5){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2),
              instead === false ? arg4 : instead(arg4, 3),
              instead === false ? arg5 : instead(arg5, 4)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2),
            instead === false ? arg4 : instead(arg4, 3),
            instead === false ? arg5 : instead(arg5, 4)
          );
        };
        break;
      case 6:
        outFn = function sixArgs(arg1, arg2, arg3, arg4, arg5, arg6){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2),
              instead === false ? arg4 : instead(arg4, 3),
              instead === false ? arg5 : instead(arg5, 4),
              instead === false ? arg6 : instead(arg6, 5)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2),
            instead === false ? arg4 : instead(arg4, 3),
            instead === false ? arg5 : instead(arg5, 4),
            instead === false ? arg6 : instead(arg6, 5)
          );
        };
        break;
      case 7:
        outFn = function sevenArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2),
              instead === false ? arg4 : instead(arg4, 3),
              instead === false ? arg5 : instead(arg5, 4),
              instead === false ? arg6 : instead(arg6, 5),
              instead === false ? arg7 : instead(arg7, 6)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2),
            instead === false ? arg4 : instead(arg4, 3),
            instead === false ? arg5 : instead(arg5, 4),
            instead === false ? arg6 : instead(arg6, 5),
            instead === false ? arg7 : instead(arg7, 6)
          );
        };
        break;
      case 8:
        outFn = function eightArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2),
              instead === false ? arg4 : instead(arg4, 3),
              instead === false ? arg5 : instead(arg5, 4),
              instead === false ? arg6 : instead(arg6, 5),
              instead === false ? arg7 : instead(arg7, 6),
              instead === false ? arg8 : instead(arg8, 7)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2),
            instead === false ? arg4 : instead(arg4, 3),
            instead === false ? arg5 : instead(arg5, 4),
            instead === false ? arg6 : instead(arg6, 5),
            instead === false ? arg7 : instead(arg7, 6),
            instead === false ? arg8 : instead(arg8, 7)
          );
        };
        break;
      case 9:
        outFn = function nineArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2),
              instead === false ? arg4 : instead(arg4, 3),
              instead === false ? arg5 : instead(arg5, 4),
              instead === false ? arg6 : instead(arg6, 5),
              instead === false ? arg7 : instead(arg7, 6),
              instead === false ? arg8 : instead(arg8, 7),
              instead === false ? arg9 : instead(arg9, 8)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2),
            instead === false ? arg4 : instead(arg4, 3),
            instead === false ? arg5 : instead(arg5, 4),
            instead === false ? arg6 : instead(arg6, 5),
            instead === false ? arg7 : instead(arg7, 6),
            instead === false ? arg8 : instead(arg8, 7),
            instead === false ? arg9 : instead(arg9, 8)
          );
        };
        break;
      case 10:
        outFn = function tenArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10){
          return noContext ?
            fn(
              instead === false ? arg1 : instead(arg1, 0),
              instead === false ? arg2 : instead(arg2, 1),
              instead === false ? arg3 : instead(arg3, 2),
              instead === false ? arg4 : instead(arg4, 3),
              instead === false ? arg5 : instead(arg5, 4),
              instead === false ? arg6 : instead(arg6, 5),
              instead === false ? arg7 : instead(arg7, 6),
              instead === false ? arg8 : instead(arg8, 7),
              instead === false ? arg9 : instead(arg9, 8),
              instead === false ? arg10 : instead(arg10, 9)
            )
            : fn.call(context,
            instead === false ? arg1 : instead(arg1, 0),
            instead === false ? arg2 : instead(arg2, 1),
            instead === false ? arg3 : instead(arg3, 2),
            instead === false ? arg4 : instead(arg4, 3),
            instead === false ? arg5 : instead(arg5, 4),
            instead === false ? arg6 : instead(arg6, 5),
            instead === false ? arg7 : instead(arg7, 6),
            instead === false ? arg8 : instead(arg8, 7),
            instead === false ? arg9 : instead(arg9, 8),
            instead === false ? arg10 : instead(arg10, 9)
          );
        };
        break;
      default:
        // really? 11 args?
        if (themArgs.length) {
          outFn = function variadic(){
            return fn.apply(context, slice(themArgs, arguments));
          };
        } else {
          outFn = function variadic(){
            return fn.apply(context, slice(arguments));
          };
        }
    }

    outFn.__length = fn.length;

    return outFn;
  }

  var argumentsRegexp = /\barguments\b/;

  /**
   * Wrap a function keeping it's context or creating another
   *
   * @param {Function} fn Original function
   * @param {*} [context] The "this" context of the newly created function
   * @param {Number} [len] Number of arguments the function receives
   * @param {Boolean} [checkArguments] Check if arguments is present, if so, use variadic automatically
   *
   * @returns {Function}
   */
  function Wrap(fn, context, len, checkArguments){
    var _len = len || fn.length;

    checkArguments = checkArguments || false;

    if (checkArguments) {
      if (len !== fn.length && argumentsRegexp.test(fn)) {
        _len = -1;
      } else if (fn.__length) {
        _len = fn.__length;
      }
    }

    context = context || null;

    return template(fn, _len, context);
  }

  /**
   * Wraps a function in another context and predefine some arguments
   *
   * @param {Function} fn Original function
   * @param {Array} [args] Array of arguments to prepend to the function
   * @param {*} [context] The "this" context of the newly created function
   * @param {Number} [len] Number of arguments the function receives
   * @param {Boolean} [checkArguments] Check if arguments is present, if so, use variadic automatically
   *
   * @returns {Function}
   */
  function Predefine(fn, args, context, len, checkArguments){
    var _len = len || fn.length;

    context = context || null;

    if (checkArguments) {
      if (len !== fn.length && argumentsRegexp.test(fn)) {
        _len = -1;
      } else if (fn.__length) {
        _len = fn.__length;
      }
    }

    args = slice(args);

    if (args.length === 0) {
      return Wrap(fn, context, len, checkArguments);
    }

    return template(fn, _len, context, args);
  }

  /**
   * Creates a new chain of delegations on the object
   *
   * @param {Object} proto
   * @param {String} target
   * @constructor
   */
  function Delegate(proto, target){
    if (!(this instanceof Delegate)) {
      return new Delegate(proto, target);
    }
    this.proto = proto;
    this.target = target;
    this.methods = [];
    this.getters = [];
    this.setters = [];
  }

  function extract(name){
    var
      obj = typeof name === 'object',
      _name = obj ? (typeof name.as === 'string' ? name.as : name.name) : name,
      _len = obj ? (typeof name.len === 'number' ? name.len : void 0) : void 0,
      _args = obj ? (typeof name.args !== 'undefined' ? name.args : false) : false;

    return {
      target: obj ? name.name : name,
      name: _name,
      len: _len,
      args: _args
    };
  }
  /**
   * Setup a function
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.method = function (name){
    var
      opts = extract(name),
      proto = this.proto,
      target = this.target;

    this.methods.push(opts.name);

    proto[opts.name] = opts.args ?
      Predefine(proto[target][opts.target], opts.args, proto[target], opts.len) :
      Wrap(proto[target][opts.target], proto[target], opts.len);

    return this;
  };

  /**
   * Delegate all functions, setters, getters and methods, from the original proto
   *
   * @param {Array} skip
   *
   * @returns {Delegate}
   */
  Delegate.prototype.all = function(skip){
    var base = this.proto[this.target], k;

    if (skip && skip.length) {
      for (k in base) {
        if (skip.indexOf(k) === -1) {
          if (typeof base[k] === 'function') {
            this.method(k);
          } else {
            this.access(k);
          }
        }
      }
    } else {
      for (k in base) {
        if (typeof base[k] === 'function') {
          this.method(k);
        } else {
          this.access(k);
        }
      }
    }
  };

  /**
   * Setup a setter
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.getter = function (name){
    var
      opts = extract(name),
      proto = this.proto,
      target = this.target;

    this.getters.push(opts.name);

    Object.defineProperty(proto, opts.name, {
      get         : function (){
        return this[target][opts.target];
      },
      enumerable  : true,
      configurable: true
    });

    return this;
  };

  /**
   * Setup a setter
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.setter = function (name){
    var
      opts = extract(name),
      proto = this.proto,
      target = this.target;

    this.setters.push(opts.name);

    Object.defineProperty(proto, opts.name, {
      set         : function (val){
        this[target][opts.target] = val;
      },
      enumerable  : true,
      configurable: true
    });

    return this;
  };

  /**
   * Setup getter and setter
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.access = function (name){
    return this.getter(name).setter(name);
  };

  /**
   * Revokes a delegated method, access, setter or getter
   *
   * @param {String} name Name of the function
   * @param {String} type Must be either method, access, setter or getter
   * @returns {Delegate}
   */
  Delegate.prototype.revoke = function (name, type){
    if (typeof this.proto[name] !== 'undefined') {
      var pos;
      switch (type) {
        case 'access':
          this.revoke(name, 'getter');
          this.revoke(name, 'setter');
          break;
        case 'setter':
        case 'method':
        case 'getter':
          pos = this[type + 's'].indexOf(name);
          if (pos > -1) {
            this[type + 's'].splice(pos, 1);
            delete this.proto[name];
          }
          break;
      }
    }

    return this;
  };

  return {
    wrap     : Wrap,
    predefine: Predefine,
    delegate : Delegate,
    flatten: slice,
    MAX_OPTIMIZED: 10
  };
}));