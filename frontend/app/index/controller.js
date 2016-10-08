import Ember from 'ember'

export default Ember.Controller.extend({
  uploadProgress: 'none',

  /**
   * The css class of the image
   *
   * Is hidden at first
   * Possible values: imageNone, imageSmall, imageBig
   */
  imgClass: 'imageNone',

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

  actions: {
    /**
     * Set an image
     *
     * @param {string} image The URL of the image
     */
    setImage(image) {
      this.set('imgURL', image)
      this.set('imgClass', 'imageSmall')
    },
    /**
     * Zoom the image
     *
     * i.e. change the css class
     */
    zoomImage(image) {
      if (this.get('imgClass') === 'imageSmall') {
        this.set('imgClass', 'imageBig')
      }
      else {
        this.set('imgClass', 'imageSmall')
      }
    }
  }
})
