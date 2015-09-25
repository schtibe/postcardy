import Ember from 'ember';

export default Ember.Component.extend({
  a: null,
  images: [],
  getImages: function () {
    $.ajax({
      url: '/api/v1/images',
      type: 'GET',
      success: (res) => {
        this.set('images', res.files)
      }
    })
  }.on('didInsertElement'),
  actions: {
    choosePic: function(image) {
      this.sendAction('bubbleImage', image);
    }
  }
})
