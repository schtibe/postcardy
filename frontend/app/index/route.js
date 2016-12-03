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
    this.getImages()
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
  getImages (from, to) {
    const DEFAULT_RANGE_START = 0
    const DEFAULT_RANGE_END = 3

    let data = {
      /*
      from: this.controller.get('from'),
      to:   this.controller.get('to')
      */
      from: from || DEFAULT_RANGE_START,
      to: to || DEFAULT_RANGE_END
    }

    this.get('ajax').request(
      '/api/v1/images',
      { data }
    ).then((res) => {
      this.controller.set('previousImages', res.files)
      this.controller.set('maxImages',    res.max)
    })
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
     * Delete an image
     *
     * @param {string} image The URL of the image
     * @returns {void}
     */
    deleteImage(image) {
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
    },
    /**
     * Action to be attached to the image slider
     *
     * @param {int} from - Range start
     * @param {int} to - Range end
     * @returns {void}
     */
    updateSlider(from, to) {
      this.getImages(from, to)
    }
  }
})
