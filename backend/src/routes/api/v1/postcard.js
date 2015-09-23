import { Router } from 'express';
import multer     from 'multer';
import moment     from 'moment';
import jsonfile   from 'jsonfile';

var fs = require('fs');

var dataFile = __dirname + '/../../../../config/data.json';
var configFile = __dirname + '/../../../../config/postconfig.json';

var config = require(configFile);

var path = require('path'),
    Postcardcreator = require('postcardcreator'),
    Postcard = Postcardcreator.Postcard;

var client = new Postcardcreator(config.username, config.password);

let router = new Router;
export default router;

router.post('/postcards',  (req, res, next) => {
  var data = jsonfile.readFileSync(dataFile);

  try {
    if (data.lastOrder) {
      var lastOrder = moment(data.lastOrder);

      if (moment().subtract(1, 'day').isBefore(lastOrder)) {
        throw new Error("The last order is less than 24hrs ago (" + lastOrder.format() + ")");
      }
    }

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

    var postcard = new Postcard(assetStream, message, recipient);

    console.log("Sending postcard")
    client.sendPostcard(postcard, function(err, result) {
      if (err) {
        console.log("Error when sending the postcard. ", err);
        handleError(err);
        return;
      }

      console.log("Postcard sent with success !");
      console.log(result);
      res.json({ type: 'success', message: 'Sent!' });
    });

    data.lastOrder = moment();
    jsonfile.writeFileSync(dataFile, data);

  }
  catch (ex) {
    res.json({ type: 'warning', message: ex.message });
  }
});

