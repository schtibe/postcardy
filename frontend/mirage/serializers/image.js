import { JSONAPISerializer } from 'ember-cli-mirage'

export default JSONAPISerializer.extend({
  serialize(data, request) {
    let json = JSONAPISerializer.prototype.serialize.apply(this, arguments)

    if ('models' in data) {
      // serializing multiple models
      let from = request.queryParams.from
      let to   = Math.min(
          request.queryParams.to,
          data.models.length
      )
      json.data = json.data.slice(from, to)

      json.meta = {
        max: data.models.length
      }
    }

    return json
  }
})
