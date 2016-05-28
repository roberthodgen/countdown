CountdownModule
.directive('countdown', [
function () {
  function link (scope, iElement, iAttrs, CountdownCtrl) {
    // TODO: Look at scheduling the $interval here and using an Countdown
    // factory for doing the updates--keeping it out of a controller.
    CountdownCtrl.element = iElement;
    CountdownCtrl.endTimestamp = iAttrs.endTimestamp;
    CountdownCtrl.start();
  }

  function compile (tElement) {
    tElement.addClass('countdown');
    return link;
  }

  return {
    'restirct': 'E',
    'compile': compile,
    'controller': 'CountdownCtrl'
  };
}]);
