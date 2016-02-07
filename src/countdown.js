(function () {

	var app = angular.module('roberthodgen.countdown', []);

	app.constant('COUNTDOWN_CLASSES', {
		'normal': 'countdown-normal',
		'warn': 'countdown-warn',
		'danger': 'countdown-danger'
	});

	app.directive('countdown', ['$interval', function ($interval) {
		return {
			restirct: 'E',
			compile: function (element, attrs) {
				element.addClass('countdown');

				return { post: postlink };

				function postlink (scope, element, attrs, controller) {
					controller.$element = element;
					controller.endTimestamp = attrs.endTimestamp;
					controller.start();
				}
			},
			controller: ['$scope', '$interval', 'COUNTDOWN_CLASSES', function ($scope, $interval, COUNTDOWN_CLASSES) {
				var self = this;

				self.$element = null;
				self.endTimestamp = null;
				self.appliedClass = null;

				var warnSeconds = 10;
				var dangerSeconds = 5;

				function Worker ($element, endTimestamp) {
					var self = this;
					self.$element = $element;
					self.endTimestamp = endTimestamp;
				}

				Worker.prototype.update = function () {
					var self = this;
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
					var self = this;
					self.seconds = self.endDate.getTime() - self.nowDate.getTime();
					self.seconds = Math.floor(self.seconds / 1000);
				};

				Worker.prototype.applyStyle = function () {
					var self = this;

					self.$element.removeClass(self.appliedClass);

					self.appliedClass = COUNTDOWN_CLASSES.normal;

					if (self.seconds <= warnSeconds) {
						self.appliedClass = COUNTDOWN_CLASSES.warn;
					}

					if (self.seconds <= dangerSeconds) {
						self.appliedClass = COUNTDOWN_CLASSES.danger;
					}

					self.$element.addClass(self.appliedClass);
				};

				Worker.prototype.writeToDom = function () {
					var self = this;
					self.$element.text(Math.abs(self.seconds));
				};

				self.start = function () {
					$interval(self.update, 1 * 1000, self);
					self.update();
				};

				self.update = function () {
					var time = $scope.$eval(self.endTimestamp);
					new Worker(self.$element, time).update();
				};

				$scope.$on('$destroy', function () {
					self.$element = null;
				});
			}]
		};
	}]);

})();
