import { Router } from 'express';
import multer     from 'multer';
var fs = require('fs')

var config = require('../../../../config/postconfig.json')

var path = require('path'),
    Postcardcreator = require('postcardcreator'),
    Postcard = Postcardcreator.Postcard;

var client = new Postcardcreator(config.username, config.password);

let router = new Router
export default router


router.post('/postcards',  (req, res, next) => {
  try {

    if (req.body.imgURL == '') {
      throw Error("No image given");
    }

    console.log("Creating postcard");
    var message = req.body.message;
    var imgPath = path.join(__dirname, '../../../../', req.body.imgURL);
    var assetStream = fs.createReadStream(imgPath);

    var recipient = {
      salutation : req.body.salutation,
      givenName  : req.body.givenName,
      familyName : req.body.familyName,
      company    : req.body.company,
      street     : req.body.street,
      postCode   : req.body.postCode,
      place      : req.body.place
    };

    //var postcard = new Postcard(assetStream, message, recipient);

    console.log("Sending postcard")
    /*
       client.sendPostcard(postcard, function(err, result) {
       if (err) {
       console.log("Error when sending the postcard. ", err);
       handleError(err);
       return;
       }

       console.log("Postcard sent with success !");
       console.log(result);
       });
       */

    res.json({ type: 'success', message: 'Sent!' });
  }
  catch (ex) {
    res.json({ type: 'error', message: ex.message });
  }
})

