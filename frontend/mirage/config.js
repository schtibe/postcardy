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

  this.get('/images', (...args) => {
    return {
      files: [
        '/assets/test_images/1.jpg',
        '/assets/test_images/2.jpg',
        '/assets/test_images/3.jpg'//,
        //'/assets/test_images/4.jpg'
      ],
      max: 4
    }
  })


  //this.passthrough()
}
