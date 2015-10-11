import Ember from 'ember';

export default Ember.Component.extend({
  images: [],
  from: 0,
  to: 3,
  getImages: function () {
    var data = {
      from: this.get('from'),
      to:   this.get('to')
    };

    Ember.$.ajax({
      url: '/api/v1/images',
      type: 'GET',
      data: data,
      success: (res) => {
        this.set('images', res.files);
        this.set('max',    res.max);
      }
    });

  }.on('didInsertElement').observes('to'),
  actions: {
    choosePic: function(image) {
      this.sendAction('bubbleImage', image);
    },
    up: function() {
      this.set('from' , this.get('from') - 1);
      this.set('to'   , this.get('to')   - 1);
    },
    down: function() {
      this.set('from' , this.get('from') + 1);
      this.set('to'   , this.get('to')   + 1);
    },
    deleteImage: function(image) {
      Ember.$.ajax({
        url: '/api/v1/images',
        type: 'DELETE',
        data: { image: image },
        success: () => {
          this.getImages();
          this.disableTo();
        }
      });
    }
  },
  disableTo: function() {
    if (this.get('to') + 1 > this.get('max')) {
      Ember.$('#downBtn').prop('disabled', true);
    }
    else {
      Ember.$('#downBtn').prop('disabled', false);
    }
  }.observes('to')
});
