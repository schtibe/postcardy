import Ember from 'ember'
import moment from 'moment'

export default Ember.Route.extend({
  /**
   * Get the last order date
   *
   * @returns {void}
   */
  getLastOrder() {
    /*
    this.get('ajax').request(
      '/api/v1/postcards/last'
    ).then((res) => {
      this.controller.set('lastOrder', res.data)
    })
    */
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
    this.getPreviousImages()
  },

  setupController(controller, model) {
    this._super(controller, model)

    this.initController()
  },

  /**
   * Retrieve the available images
   *
   * Get a list of available images from
   *
   * @param {int} from - The range start
   * @param {int} to - Range end
   * @returns {void}
   */
  async getPreviousImages (from, to) {
    const DEFAULT_RANGE_START = 0
    const DEFAULT_RANGE_END = 3

    from = from || DEFAULT_RANGE_START
    to   =   to || DEFAULT_RANGE_END

    let data = await this.get('store').query('image', { from, to })
    this.controller.set('maxImages', data.meta.max)
    this.controller.set('previousImages', data)
  },

  async model() {
    let address = await this.get('store').findRecord('address', 'default')
    let message = moment().format('DD.MM.YYYY')
    return this.get('store').createRecord('postcard', {
      message,
      recipient: address
    })

  },

  /**
   * Set an image
   *
   * @param {string} image The URL of the image
   * @returns {void}
   */
  async setImage(image) {
    this.controller.set('model.image', image)
    this.controller.set('isImageSet', true)
  },

  actions: {
    notifyUpload(image) {
      this.setImage(image)
      this.getPreviousImages()
    },
    chooseImage(image) {
      this.setImage(image)
    },
    /**
     * Delete an image
     *
     * @param {string} image The URL of the image
     * @returns {void}
     */
    deleteImage(image) {
      /*
      this.get('ajax').del(
        '/api/v1/images', {
          data: {
            image: this.controller.get('model.imgURL')
          }
        }
      ).then((res) => {
        this.controller.set('model.imgURL', '')
        this.controller.set('isImageSet', false)
      })
      */
    },
    /**
     * Unset an image
     * @returns {void}
     */
    unsetImage() {
      this.controller.set('model.image', '')
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

      /*
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
      */
    },
    /**
     * Action to be attached to the image slider
     *
     * @param {int} from - Range start
     * @param {int} to - Range end
     * @returns {void}
     */
    updateSlider(from, to) {
      this.getPreviousImages(from, to)
    }
  }
})
