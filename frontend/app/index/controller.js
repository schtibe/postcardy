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
  recipient: {
    salutation: 'Herr',
    givenName : 'Stefan',
    familyName: 'Heinemann',
    company   : '',
    street    : 'hintere Strasse 24',
    postCode  : '3284',
    place     : 'Fräschels'
  },

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

  init() {
    this.getLastOrder()
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

      let data = this.get('recipient')
      data.imgURL = this.get('imgURL')
      data.message = this.get('message')

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
