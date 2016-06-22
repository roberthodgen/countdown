/**
 * @name
 * countdown
 * @description
 * Displays the number of seconds remianing until `endTimestamp` value.
 * `endTimestamp` may be a string or expression.
 * Configure when the warning CSS class will be applied with `warnSeconds`.
 * Configure when the danger CSS class will be applied with `dangerSeconds`.
 * @example
 * Basic usage with scope value:
 * ```html
 * <countdown end-timestamp="vm.end"></countdown>
 * ```
 * Basic usage with static timestamp:
 * ```html
 * <countdown end-timestamp="2017-01-01T00:00:00.000Z"></countdown>
 * ```
 * Configuring the warning class application interval:
 * ```html
 * <countdown end-timestamp="vm.end" warn-seconds="30"></countdown>
 * ```
 * Configuring the danger class application interval:
 * ```html
 * <countdown end-timestamp="vm.end" danger-seconds="10"></countdown>
 * ```
 */
CountdownModule
.directive('countdown', [
  'COUNTDOWN_CLASSES',
  '$interval',
function (COUNTDOWN_CLASSES, $interval) {
  function link (scope, iElement, iAttrs) {
    var interval = null,
      appliedClass = null,
      seconds = null,
      warnSeconds = parseInt(iAttrs.warnSeconds, 10) || 10,
      dangerSeconds = parseInt(iAttrs.dangerSeconds, 10) || 5;

    function update () {
      let timestamp = null;

      try {
        timestamp = scope.$eval(iAttrs.endTimestamp);
      } catch (e) {
        timestamp = iAttrs.endTimestamp;
      }

      if (!angular.isDefined(timestamp) || timestamp === null) {
        iElement.removeClass(appliedClass);
        iElement.text('');
        return;
      }

      let previousSeconds = seconds;
      seconds = new Date(timestamp).getTime() - Date.now();
      seconds = Math.max(Math.floor(seconds / 1000), 0);

      if (previousSeconds === seconds) {
        return;
      }

      let previousClass = appliedClass;
      appliedClass = COUNTDOWN_CLASSES.normal;

      if (seconds <= warnSeconds) {
        appliedClass = COUNTDOWN_CLASSES.warn;
      }

      if (seconds <= dangerSeconds) {
        appliedClass = COUNTDOWN_CLASSES.danger;
      }

      if (appliedClass !== previousClass) {
        iElement.removeClass(previousClass);
        iElement.addClass(appliedClass);
      }

      iElement.text(seconds);

      if (seconds === 0) {
        $interval.cancel(interval);
      }
    }

    function setupInterval () {
      $interval.cancel(interval);
      interval = $interval(update, 1 * 1000);
    }

    scope.$watch(() => {
      try {
        return scope.$eval(iAttrs.endTimestamp);
      } catch (e) {
        return iAttrs.endTimestamp;
      }
    }, () => {
      update();
      setupInterval();
    });

    scope.$on('$destroy', function () {
      $interval.cancel(interval);
    });
  }

  function compile (tElement) {
    tElement.addClass('countdown');
    return link;
  }

  return {
    'restirct': 'AE',
    'compile': compile
  };
}]);
