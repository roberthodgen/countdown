CountdownModule
.controller('CountdownCtrl', [
  '$scope',
  '$interval',
  'COUNTDOWN_CLASSES',
function ($scope, $interval, COUNTDOWN_CLASSES) {
  var self = this;

  self.element = null;
  self.interval = null;
  self.endTimestamp = null;
  self.appliedClass = null;

  var warnSeconds = 10;
  var dangerSeconds = 5;

  // TODO: Factor Worker into an Angular factory
  function Worker (element, endTimestamp) {
    var self = this;
    self.element = element;
    self.endTimestamp = endTimestamp;
  }

  Worker.prototype.update = function () {
    var self = this;
    if (!angular.isDefined(self.endTimestamp) || self.endTimestamp === null) {
      return;
    }

    self.buildDates();
    self.calculateTimeRemaining();
    self.applyStyle();
    self.writeToDom();
  };

  Worker.prototype.buildDates = function () {
    var self = this;
    self.endDate = new Date(self.endTimestamp);
    self.nowDate = new Date();
  };

  Worker.prototype.calculateTimeRemaining = function () {
    var self = this,
      seconds = self.endDate.getTime() - self.nowDate.getTime();
    seconds = Math.floor(seconds / 1000);
    self.seconds = Math.max(seconds, 0);
  };

  Worker.prototype.applyStyle = function () {
    var self = this;

    self.element.removeClass(self.appliedClass);

    self.appliedClass = COUNTDOWN_CLASSES.normal;

    if (self.seconds <= warnSeconds) {
      self.appliedClass = COUNTDOWN_CLASSES.warn;
    }

    if (self.seconds <= dangerSeconds) {
      self.appliedClass = COUNTDOWN_CLASSES.danger;
    }

    self.element.addClass(self.appliedClass);
  };

  Worker.prototype.writeToDom = function () {
    var self = this;
    self.element.text(self.seconds);
  };

  self.start = function () {
    self.interval = $interval(self.update, 1 * 1000, self);
    self.update();
  };

  self.update = function () {
    var time = $scope.$eval(self.endTimestamp);
    new Worker(self.element, time).update();
  };

  $scope.$on('$destroy', function () {
    $interval.cancel(self.interval);
    self.element = null;
  });
}]);