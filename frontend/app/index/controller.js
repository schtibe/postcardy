import Ember from 'ember'

export default Ember.Controller.extend({
  /**
   * the upload progress
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
   * The result string of sending a postcard
   */
  result: '',

  /**
   * List of the previously uploaded images
   */
  previousImages: [],

  /**
   * The count of the previously uploaded images
   */
  maxImages: null
})
