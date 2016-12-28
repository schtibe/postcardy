import DS from 'ember-data'

export default DS.Model.extend({
  name      : DS.attr('string'),
  URL       : DS.attr('string'),
  postcards : DS.hasMany('postcard')
})
