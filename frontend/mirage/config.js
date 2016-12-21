export default function() {
  this.namespace = '/api/v1'
  this.urlPrefix = ''
  this.logging = true

  this.get('/addresses', () => {
    return {
      data: {
        'salutation' : 'Herr',
        'company'    : 'Adfinis SyGroup AG',
        'givenName'  : 'Stefan',
        'familyName' : 'Heinemann',
        'street'     : 'Keltenstrasse 98',
        'postCode'   : '3018',
        'place'      : 'Bern'
      }
    }
  })

  this.post('/postcards', () => {
    return {
      type: 'success',
      message: 'Sent!'
    }
  }, { timing: 3000 })

  this.get('/images', (_, request) => {
    let from = request.queryParams.from
    let to   = request.queryParams.to

    let files = [
        '/assets/test_images/1.jpg',
        '/assets/test_images/2.jpg',
        '/assets/test_images/3.jpg',
        '/assets/test_images/4.jpg'
      ]
    return {
      files: files.slice(from, to),
      max: files.length
    }
  })

  this.get('/postcards/last', () => {
    return {
      data: {
        date: moment().subtract(1, 'days'),
        image: '/assets/test_images/4.jpg'
      }
    }
  })

  //this.passthrough()
}
