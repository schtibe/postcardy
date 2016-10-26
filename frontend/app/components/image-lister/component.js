import Ember from 'ember'
import { on, observes } from 'ember-computed-decorators'

export default Ember.Component.extend({
  ajax: Ember.inject.service(),

  images: [],

  /**
   * Specify the range to display
   */
  from:    0,
  to:      3,

  /**
   * Whether the up button is enabled
   */
  isUpEnabled: false,

  /**
   * Whether the down button is enabled
   */
  isDownEnabled: true,

  /**
   * Do it with this
   * https://guides.emberjs.com/v1.10.0/templates/writing-helpers/
   */
  makeThumbPath(image) {
    let parts = image.split("\.")
    let fileName = parts.slice(0, parts.length - 1).join('.')
    let ext = parts.slice(parts.length -1)

    return `${fileName}_thumb.${ext}`
  },

  /**
   * Retrieve the available images
   *
   * Get a list of available images from
   * the server as soon as we're loaded
   */
  @on('didInsertElement')
  @observes('to')
  getImages () {
    let data = {
      from: this.get('from'),
      to:   this.get('to')
    }

    this.get('ajax').request(
      '/api/v1/images',
      { data }
    ).then((res) => {
      this.set('images', res.files.map(this.makeThumbPath))
      this.set('max',    res.max)
    })
  },
  actions: {
    /**
     * When a picture was chosen ('use')
     * @param {string} image - The image that was chosen
     * @returns {void}
     */
    choosePic(image) {
      this.sendAction('choose', image)
    },
    /**
     * Up button was clicked. change the range
     * @returns {void}
     */
    up() {
      this.set('from' , this.get('from') - 1)
      this.set('to'   , this.get('to')   - 1)
    },
    /**
     * Down button was clicked. Shift the range
     * @returns {void}
     */
    down() {
      this.set('from' , this.get('from') + 1)
      this.set('to'   , this.get('to')   + 1)
    },
    /**
     * Delete an image from the gallery
     * @param {string} image - The image name
     * @returns {void}
     */
    deleteImage(image) {
      this.get('ajax').del(
        '/api/v1/images',
        { data: { image } }
      ).then((res) => {
        this.getImages()
      })
    }
  },
  /**
   * Determine whether the down button is disabled
   *
   * The down button must be disabled if there
   * are no more images available
   * @returns{void}
   */
  @observes('to')
  @observes('max')
  @on('willRender')
  downState() {
    const count = 3
    this.set('isDownEnabled',
      !(this.get('to') === this.get('max')) &&
      this.get('max') >= count
    )
  },
  /**
   * Determine whether the up button is disabled
   * @returns{void}
   */
  @observes('from')
  upState() {
    this.set('isUpEnabled', this.get('from') > 0)
  }
})

