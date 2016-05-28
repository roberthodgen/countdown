// node_modules/.bin/babel example/app.js --out-file example/app-compiled.js

const CountdownExampleModule = angular.module('countdown-example', [
  'roberthodgen.countdown'
]);

CountdownExampleModule
.controller('ExampleCtrl', [
  '$scope',
class ExampleCtrl {
  constructor ($scope) {
    this.$scope = $scope;
    this.setupNearTimestamp();
  }

  setupNearTimestamp () {
    let now = new Date();

    this.timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
      now.getHours(), now.getMinutes(), now.getSeconds() + 13);
  }
}]);
