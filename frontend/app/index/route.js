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
   * @param {int} _from - The range start
   * @param {int} _to - Range end
   * @returns {void}
   */
  async getPreviousImages (_from, _to) {
    const DEFAULT_RANGE_START = 0
    const DEFAULT_RANGE_END = 3

    let from = _from || DEFAULT_RANGE_START
    let to   =   _to || DEFAULT_RANGE_END

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
    async deleteImage(image) {
      await image.destroyRecord()
      this.controller.set('model.image', null)
      this.controller.set('isImageSet', false)
      this.getPreviousImages()
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
    async send() {
      let model = this.controller.get('model')

      if (!model.get('isNew')) {
        return
      }

      if (!model.get('image.id')) {
        this.controller.set('result', 'No image defined!')
        this.controller.set('resultClass', 'error')
        return
      }

      // TODO all this necessary like this?
      this.controller.set('result', '')
      this.controller.set('isSending', true)
      this.controller.set('resultClass', '')

      await model.save()

      this.controller.set('isSending', false)
      this.controller.set('result', 'Sent!')
      this.controller.set('resultClass', 'success')
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
