export default function() {
  this.namespace = '/api/v1'
  this.urlPrefix = ''
  this.logging = true

  this.get('/addresses/default', ({ addresses } , request) => {
    return addresses.first()
  })

  this.post('/postcards', () => {
    // TODO: how to respond success in jsonapi?
    /*
    return {
      type: 'success',
      message: 'Sent!'
    }
    */
  }, { timing: 3000 })

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
