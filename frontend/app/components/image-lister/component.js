import Ember from 'ember';

export default Ember.Component.extend({
  a: null,
  images: [],
  getImages: function () {
    $.ajax({
      url: '/api/v1/images',
      type: 'GET',
      success: (res) => {
        console.log(res)
        this.set('images', res.files)
      }
    })
  }.on('didInsertElement'),
})
