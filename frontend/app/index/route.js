import Ember from 'ember'
import moment from 'moment'

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  /**
   * Get the last order date
   *
   * @returns {void}
   */
  getLastOrder() {
    this.get('ajax').request(
      '/api/v1/postcards/last'
    ).then((res) => {
      this.controller.set('lastOrder', res.data)
    })
  },

  /**
   * Get the default address
   * @returns {void}
   */
  getDefaultAddress() {
    return this.get('ajax').request(
      '/api/v1/addresses'
    )
  },

  /**
   * We need to provide a way to reset the controller's
   * properties
   * Can't do it in setupController since it ain't fired with
   * refresh (or at least not when the model isn't changed, which
   * seems to be the case here)
   * @returns{void}
   */
  initController() {
    this.controller.set('isSending', false)
    this.controller.set('isImageSet', false)
    this.controller.set('resultClass', '')
    this.controller.set('result', '')

    this.getLastOrder()
  },

  setupController(controller, model) {
    this._super(controller, model)

    this.initController()
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
     * @returns {void}
     */
    setImage(image) {
      this.controller.set('model.imgURL', image)
      this.controller.set('isImageSet', true)
    },
    /**
     * Unset an image
     * @returns {void}
     */
    unsetImage() {
      this.controller.set('model.imgURL', '')
      this.controller.set('isImageSet', false)
    },
    /**
     * Reset the route
     * @returns {void}
     */
    reset() {
      this.refresh()
      this.initController()
    },
    /**
     * Send the postcard
     * @returns {void}
     */
    send() {
      this.controller.set('isSending', true)
      this.controller.set('resultClass', '')

      let data = this.controller.get('model')

      this.get('ajax').post(
        '/api/v1/postcards',
        { data }
      ).then((res) => {
        this.controller.set('result',      res.message)
        this.controller.set('resultClass', res.type)

        this.getLastOrder()
        this.controller.set('isSending', false)
      }).catch((error) => {
        this.controller.set('result', `Error requesting the order: ${error}`)
        this.controller.set('resultClass', 'error')

        this.controller.set('isSending', false)
      })
    }
  }
})
