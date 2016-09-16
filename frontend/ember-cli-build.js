/* global require, module */

'use strict'


let EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    minifyJS:  false,
    cssnextOptions: {
      features: { rem: false },
      plugins:  [ require('postcss-responsive-type') ],
      browsers: 'last 2 Firefox versions, last 2 Chrome versions'
    },
    babel: {
      includePolyfill: true,
      optional: [ 'es7.decorators' ],
      blacklist: [
        'es3.memberExpressionLiterals',
        'es3.propertyLiterals',
        'es5.properties.mutators',
        'es6.arrowFunctions',
        'es6.forOf',
        'es6.spread',
        'es6.properties.computed',
        'es6.properties.shorthand',
        'es6.constants',
        'es6.templateLiterals'
      ]
    },
    'ember-cli-qunit': {
        useLintTree: false
    }
  })

  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js')
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css')

  return app.toTree()
}

