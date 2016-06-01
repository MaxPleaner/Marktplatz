"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Routes = function () {
  function Routes() {
    _classCallCheck(this, Routes);
  }

  _createClass(Routes, [{
    key: "addRoutesToApp",
    value: function addRoutesToApp(appComponents) {
      var app = appComponents.app;
      app.use(function (req, res) {
        res.send({ msg: "hello" });
      });
      return app;
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return "\n\n      Routes\n        * => 'hello'\n    ";
    }
  }]);

  return Routes;
}();

exports.default = Routes;
