import Ember from 'ember'
import { on, observes } from 'ember-computed-decorators'

export default Ember.Component.extend({
  /**
   * Specify the range to display
   *
   * @TODO make those configurable default values
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
   * Notify an update to the component user
   *
   * @returns {void}
   */
  notifyUpdate() {
    this.sendAction('update', this.get('from'), this.get('to'))
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
      if (this.get('isUpEnabled')) {
        this.set('from' , this.get('from') - 1)
        this.set('to'   , this.get('to')   - 1)

        this.notifyUpdate()
      }
    },
    /**
     * Down button was clicked. Shift the range
     * @returns {void}
     */
    down() {
      if (this.get('isDownEnabled')) {
        this.set('from' , this.get('from') + 1)
        this.set('to'   , this.get('to')   + 1)

        this.notifyUpdate()
      }
    },
    /**
     * Delete an image from the gallery
     * @param {image} image - The image
     * @returns {void}
     */
    deleteImage(image) {
      this.sendAction('delete', image)
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

