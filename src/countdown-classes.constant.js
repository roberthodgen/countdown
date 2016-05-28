/**
 * @name
 * COUNTDOWN_CLASSES
 * @description
 * Contains the classes to be applied by the countdown directive.
 * @todo
 * Consider factoring this into a an angular provider for config-stage setup.
 */
CountdownModule
.constant('COUNTDOWN_CLASSES', {
  'normal': 'countdown-normal',
  'warn': 'countdown-warn',
  'danger': 'countdown-danger'
});
