export default function() {
  this.namespace = '/api/v1'
  this.timing = 400
  this.urlPrefix = ''

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

  //this.passthrough()
}
