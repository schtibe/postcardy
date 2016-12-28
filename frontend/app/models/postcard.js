import DS from 'ember-data'

export default DS.Model.extend({
  message   : DS.attr('string'),
  date      : DS.attr('date'),
  sentDate  : DS.attr('date'),
  recipient : DS.belongsTo('address'),
  image     : DS.belongsTo('image')
})
