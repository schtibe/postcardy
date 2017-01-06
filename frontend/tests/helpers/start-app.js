import Ember from 'ember'
import Application from '../../app'
import config from '../../config/environment'

export default function startApp(attrs) {
  let application

  // disable the deprecation warnings
  Ember.deprecate = function() { }

  // use defaults, but you can override
  let attributes = Ember.assign({}, config.APP, attrs)

  Ember.run(() => {
    application = Application.create(attributes)
    application.setupForTesting()
    application.injectTestHelpers()
  })

  return application
}
