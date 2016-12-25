import Ember from 'ember'

import moment from 'moment'

export default Ember.Component.extend({
  date: moment(),

  enteredLines: 1,

  classNames: [ 'message-box' ],

  tooManyLines: Ember.computed('enteredLines', function() {
    const maxLines = 12
    return this.get('enteredLines') > maxLines
  }),

  lineCheck: Ember.observer('value', function() {
    let val = this.get('value')
    let rows = val.split(/\r?\n/)

    this.set('enteredLines', rows.length)
  })
})
