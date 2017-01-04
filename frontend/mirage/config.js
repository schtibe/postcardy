export default function() {
  this.namespace = '/api/v1'
  this.urlPrefix = ''

  this.get('/addresses/default', ({ addresses } , request) => {
    return addresses.first()
  })

  this.post('/postcards', (schema, request) => {
    let data = JSON.parse(request.requestBody).data.attributes
    let address = JSON.parse(request.requestBody).data.relationships.recipient

    schema.addresses.create(address)
    return schema.postcards.create(data)
  }, { timing: 500 })

  this.get('/images', ({ images }, request) => {
    return images.all()
  })

  this.get('/images/:id', ({ images }, request) => {
    let id = request.params.id

    return images.find(id)
  })

  this.del('/images/:id', (schema, request) => {
    let id = request.params.id

    return schema.db.images.remove(id)
  })

  this.get('/postcards/last', ({ postcards }, request) => {
    return postcards.first()
  })

  //this.passthrough()
}
