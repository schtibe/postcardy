import { Model, belongsTo } from 'ember-cli-mirage'

export default Model.extend({
  recipient : belongsTo('address'),
  image     : belongsTo('image')
})
