import ENV from '../config/environment'
import DS from 'ember-data'

export default DS.JSONAPIAdapter.extend({
  host: ENV.APP.host,
  namespace: 'api/v1'
})
