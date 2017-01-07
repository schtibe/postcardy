export default function() {
  this.namespace = '/api/v1'
  this.urlPrefix = ''

  this.get('/addresses/default', ({ addresses } , request) => {
    return addresses.first()
  })

  this.get('/addresses/:id', (schema, request) => {
    return schema.addresses.find(request.params.id)
  })

  this.post('/addresses', (schema, request) => {
    let data = JSON.parse(request.requestBody).data.attributes

    return schema.addresses.create(data)
  })

  this.post('/postcards', (schema, request) => {
    let data = JSON.parse(request.requestBody).data
    let attrs = data.attributes
    let rels  = data.relationships

    attrs.recipientId = rels.recipient.data.id
    attrs.imageId     = rels.image.data.id

    return schema.postcards.create(attrs)
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
