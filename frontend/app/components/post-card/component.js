import Ember from 'ember';

export default Ember.Component.extend({
  imgURL: '',
  message: '',
  salutation: 'Herr',
  givenName: 'Stefan',
  familyName: 'Heinemann',
  company: '',
  street: 'hintere Strasse 24',
  postCode: '3284',
  place: 'Fräschels',
  result: '',
  resultClass: '',
  actions: {
    setImage: function(image) {
      this.set('imgURL', image);
    },
    send: function() {
      console.log("Sending data");

      var data = {
        imgURL     : this.get('imgURL'),
        message    : this.get('message'),
        salutation : this.get('salutation'),
        givenName  : this.get('givenName'),
        familyName : this.get('familyName'),
        company    : this.get('company'),
        street     : this.get('street'),
        postCode   : this.get('postCode'),
        place      : this.get('place')
      };

      Ember.$.ajax({
        url: '/api/v1/postcards',
        data: data,
        type: 'POST',
        success: (res) => {
          this.set('result', res.message);
          this.set('resultClass', res.type);
        },
        error: (err) => {
          this.set('resultClass', 'error');
          this.set('result', "Error requesting the order: " + err);
        }
      });
    }
  }
});
