# Countdown
> Countdown directive


## Install

`$ bower install --save-dev angular-timestamp-countdown`


## Example

```html
<countdown end-timestamp="timestamp"></countdown>
```

Counts down the number of seconds to timestamp; stops at 0.

Include `roberthodgen.countdown` as an Angular module dependency, e.g.:

```js
var app = angular.module('MyApp', ['roberthodgen.countdown']);
```


## Gulp tasks

- `$ gulp build` builds, minifies, and copies `src` files.
