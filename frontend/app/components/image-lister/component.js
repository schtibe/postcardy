import Ember from 'ember'

import { on, observes } from 'ember-computed-decorators'

export default Ember.Component.extend({
  images: [],
  from:    0,
  to:      3,
  @on('didInsertElement')
  @observes('to')
  getImages () {
    var data = {
      from: this.get('from'),
      to:   this.get('to')
    }

    Ember.$.ajax({
      url: '/api/v1/images',
      type: 'GET',
      data: data,
      success: (res) => {
        this.set('images', res.files)
        this.set('max',    res.max)
      }
    })

  },
  actions: {
    choosePic(image) {
      this.sendAction('bubbleImage', image)
    },
    up() {
      this.set('from' , this.get('from') - 1)
      this.set('to'   , this.get('to')   - 1)
    },
    down() {
      this.set('from' , this.get('from') + 1)
      this.set('to'   , this.get('to')   + 1)
    },
    deleteImage(image) {
      Ember.$.ajax({
        url: '/api/v1/images',
        type: 'DELETE',
        data: { image: image },
        success: () => {
          this.getImages()
          this.disableTo()
        }
      })
    }
  },
  @observes('on')
  disableTo() {
    if (this.get('to') + 1 > this.get('max')) {
      Ember.$('#downBtn').prop('disabled', true)
    }
    else {
      Ember.$('#downBtn').prop('disabled', false)
    }
  }
})

