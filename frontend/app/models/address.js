import DS from 'ember-data'

export default DS.Model.extend({
  salutation : DS.attr('string'),
  company    : DS.attr('string'),
  givenName  : DS.attr('string'),
  familyName : DS.attr('string'),
  street     : DS.attr('string'),
  postCode   : DS.attr('string'),
  place      : DS.attr('string')
})
