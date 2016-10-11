import Ember from 'ember'
import Moment from 'moment'

export default Ember.Controller.extend({

  /**
   * The URL of the currently chosen or uploaded image
   */
  imgURL: null,

  /**
   * TODO the upload progress
   */
  uploadProgress: 'none',

  /**
   * Whether the app is sending a postcard
   *
   * used to show the progress bar
   */
  isSending: false,

  /**
   * Whether an image is set
   */
  isImageSet: false,

  /**
   * The class of the result box
   */
  resultClass: '',

  /**
   * Variable holding when the last order was
   */
  lastOrder: null,

  /**
   * The postcard recipient
   */
  recipient: {},

  /**
   * The message
   */
  message: moment().format('DD.MM.YYYY'),

  /**
   * Get the last order date
   */
  getLastOrder() {
    Ember.$.ajax({
      url: '/api/v1/postcards/last',
      type: 'GET',
      success: (res) => {
        this.set('lastOrder', res.data)
      }
    })
  },

  /**
   * Get the default address
   */
  getDefaultAddress() {
    Ember.$.ajax({
      url: '/api/v1/addresses',
      type: 'GET',
      success: (res) => {
        this.set('recipient', res.data)
      }
    })
  },

  init() {
    this.getLastOrder()
    this.getDefaultAddress()
  },

  actions: {
    /**
     * Set an image
     *
     * @param {string} image The URL of the image
     */
    setImage(image) {
      this.set('imgURL', image)
      this.set('isImageSet', true)
    },
    /**
     * Unset an image
     */
    unsetImage() {
      this.set('imgURL', '')
      this.set('isImageSet', false)
    },
    /**
     * Reset the route - TODO doesn't work yet
     */
    reset() {
      this.transitionToRoute('index')
    },
    /**
     * Send the postcard
     */
    send() {
      this.set('isSending', true)
      this.set('resultClass', '')

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
        this.set('result',      res.message)
        this.set('resultClass', res.type)

        this.getLastOrder()
      }).error(err => {
        this.set('result', 'Error requesting the order: ' + err)
        this.set('resultClass', 'error')
      }).always(() => {
        this.set('isSending', false)
      })
    }
  }
})
