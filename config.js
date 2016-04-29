module.exports = {

  'closureStart': '(function () {\n',
  'closureEnd': '\n})();',

  'styles': [
    'src/**/*.scss'
  ],

  'dest': './',

  'js': [
    'src/*.module.js',
    'src/**/*.js'
  ],

  'script': 'countdown.js',
  'scriptMin': 'countdown.min.js',
  'style': 'countdown.css'
};
