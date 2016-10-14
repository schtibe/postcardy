import Ember from 'ember';

/**
 * TODO use
 * https://github.com/ember-cli/ember-ajax
 */

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  /**
   * Get the last order date
   */
  getLastOrder() {
    Ember.$.ajax({
      url: '/api/v1/postcards/last',
      type: 'GET',
      success: (res) => {
        this.controller.set('lastOrder', res.data)
      }
    })
  },

  /**
   * Get the default address
   */
  getDefaultAddress() {
    return this.get('ajax').request(
      '/api/v1/addresses'
    )
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.getLastOrder()
  },

  model() {
    return new Ember.RSVP.Promise((resolve) => {
      this.getDefaultAddress().then(res => {
        resolve({
          recipient: res.data,
          imgURL: '',
          message: moment().format('DD.MM.YYYY')
        })
      })
    })
  },

  actions: {
    /**
     * Set an image
     *
     * @param {string} image The URL of the image
     */
    setImage(image) {
      this.set('imgURL', image)
      this.controller.set('isImageSet', true)
    },
    /**
     * Unset an image
     */
    unsetImage() {
      this.set('imgURL', '')
      this.controller.set('isImageSet', false)
    },
    /**
     * Reset the route
     */
    reset() {
      this.refresh()
    },
    /**
     * Send the postcard
     */
    send() {
      this.controller.set('isSending', true)
      this.controller.set('resultClass', '')

      let data = {
        recipient: this.get('recipient'),
        imgUrl   : this.get('imgURL'),
        message  : this.get('message')
      }

      Ember.$.ajax({
        url: '/api/v1/postcards',
        data,
        type: 'POST'
      }).done(res => {
        this.controller.set('result',      res.message)
        this.controller.set('resultClass', res.type)

        this.getLastOrder()
      }).error(err => {
        this.controller.set('result', 'Error requesting the order: ' + err)
        this.controller.set('resultClass', 'error')
      }).always(() => {
        this.controller.set('isSending', false)
      })
    }
  }
});
