# Countdown
> Angular timestamp countdown directive


## Install

`$ bower install --save-dev angular-timestamp-countdown`


## Example

Basic usage with scope value:
```html
<countdown end-timestamp="vm.end"></countdown>
```

Basic usage with static timestamp:
```html
<countdown end-timestamp="2017-01-01T00:00:00.000Z"></countdown>
```

Configuring the warning class application interval:
```html
<countdown end-timestamp="vm.end" warn-seconds="30"></countdown>
```

Configuring the danger class application interval:
```html
<countdown end-timestamp="vm.end" danger-seconds="10"></countdown>
```

Counts down the number of seconds to timestamp; stops at 0.

Include `roberthodgen.countdown` as an Angular module dependency, e.g.:

```js
var app = angular.module('MyApp', ['roberthodgen.countdown']);
```

See `example/example.html` and `example/app.js` for sample.


## Gulp tasks

- `$ gulp build` builds, minifies, and copies `src` files.
