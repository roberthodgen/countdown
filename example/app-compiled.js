'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// node_modules/.bin/babel example/app.js --out-file example/app-compiled.js

var CountdownExampleModule = angular.module('countdown-example', ['roberthodgen.countdown']);

CountdownExampleModule.controller('ExampleCtrl', ['$scope', function () {
  function ExampleCtrl($scope) {
    _classCallCheck(this, ExampleCtrl);

    this.$scope = $scope;
    this.setupNearTimestamp();
  }

  _createClass(ExampleCtrl, [{
    key: 'setupNearTimestamp',
    value: function setupNearTimestamp() {
      var now = new Date();

      this.timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + 13);
    }
  }]);

  return ExampleCtrl;
}()]);
