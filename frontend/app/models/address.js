import DS from 'ember-data'

import Copyable from 'ember-cli-copyable'

export default DS.Model.extend(Copyable, {
  salutation : DS.attr('string'),
  company    : DS.attr('string'),
  givenName  : DS.attr('string'),
  familyName : DS.attr('string'),
  street     : DS.attr('string'),
  postCode   : DS.attr('string'),
  place      : DS.attr('string')
})
