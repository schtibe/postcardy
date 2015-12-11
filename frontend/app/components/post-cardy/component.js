import Ember from 'ember'

export default Ember.Component.extend({
  chosenPic: '',
  actions: {
    bubbleImage: function(image) {
      this.set('chosenPic', image)
    }
  }
})
