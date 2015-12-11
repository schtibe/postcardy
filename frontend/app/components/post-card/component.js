import Ember from 'ember'

import { observes, on } from 'ember-computed-decorators'

export default Ember.Component.extend({
  imgURL          : '',
  imgClass        : 'imageNone',
  message         : '',
  salutation      : 'Herr',
  givenName       : 'Stefan',
  familyName      : 'Heinemann',
  company         : '',
  street          : 'hintere Strasse 24',
  postCode        : '3284',
  place           : 'Fräschels',
  result          : '',
  resultClass     : '',
  disabled        : false,
  receiver        : null,
  uploadprogress  : 'none',
  sendingprogress : 'none',
  actions     : {
    uploading() {
      this.set('uploadprogress', 'block')
    },
    setImage(image) {
      this.set('imgURL', image)
      this.set('imgClass', 'imageSmall')
      this.set('uploadprogress', 'none')
    },
    click() {
      if (this.get('imgClass') === 'imageSmall') {
        this.set('imgClass', 'imageBig')
      }
      else {
        this.set('imgClass', 'imageSmall')
      }
    },
    send() {
      console.log('Sending data') // eslint-disable-line no-undef
      this.set('sendingprogress', 'block')

      let data = {
        imgURL     : this.get('imgURL'),
        message    : this.get('message'),
        salutation : this.get('salutation'),
        givenName  : this.get('givenName'),
        familyName : this.get('familyName'),
        company    : this.get('company'),
        street     : this.get('street'),
        postCode   : this.get('postCode'),
        place      : this.get('place')
      }

      Ember.$.ajax({
        url: '/api/v1/postcards',
        data: data,
        type: 'POST'
      }).done((res) => {
          this.set('result', res.message)
          this.set('resultClass', res.type)
          this.set('disabled', true)
      }).error((err) => {
          this.set('resultClass', 'error')
          this.set('result', 'Error requesting the order: ' + err)
      }).always(() => {
          this.set('sendingproress', 'none')
      })
    },
    deleteImage() {
      Ember.$.ajax({
        url: '/api/v1/images',
        type: 'DELETE',
        data: { image: this.get('imgURL') },
        success: () => {
          this.set('imgURL', null)
        }
      })
    }
  },
  @observes('imgURL')
  imageIsSet() {
    if (this.get('imgURL') === null) {
      this.set('imgClass', 'imageNone')
    }
    else {
      this.set('imgClass', 'imageSmall')
    }
  },
  @on('didInsertElement')
  initialise() {
    Ember.$.ajax({
      url: '/api/v1/postcards/last',
      type: 'GET',
      success: (res) => {
        if (!res.isOneDayAgo) {
          this.set('disabled', true)
        }
      }
    })
  }
})
