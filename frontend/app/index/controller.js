import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    bubbleImage(chosenPic) {
      this.set('chosenPic', chosenPic)
    }
  }
})
