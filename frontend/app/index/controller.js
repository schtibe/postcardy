import Ember from 'ember'

export default Ember.Controller.extend({
  uploadProgress: 'none',

  toggleUploadProgress() {
    if (this.get('uploadProgress') == 'none') {
      this.set('uploadProgress', )
    }
  },

  actions: {
    setImage(image) {
      this.set('imgURL', image)
      this.set('imgClass', 'imageSmalle')
    },
    uploading() {
    }
  }
})
