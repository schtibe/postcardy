let express = require('express')
let multer = require('multer')
let moment = require('moment')
let jsonfile = require('jsonfile')
let fs = require('fs')

let dataFile = __dirname + '/../../../../config/data.json';
let configFile = __dirname + '/../../../../config/postconfig.json';

let config = require(configFile)

let path = require('path'),
    Postcardcreator = require('postcardcreator'),
    SSOPostHelper = require('postcardcreator/lib/helper/SSOPostHelper'),
    Postcard = Postcardcreator.Postcard;

let SSOHelper = new SSOPostHelper()


let router = express.Router();
export default router;

function isOneDayAgo() {
  return true;
  let data = jsonfile.readFileSync(dataFile);

  if (data.lastOrder) {
    let lastOrder = moment(data.lastOrder);

    if (moment().subtract(1, 'day').isBefore(lastOrder)) {
      return false;
    }
  }

  return true;
}

router.post('/postcards',  (req, res, next) => {
  let data = jsonfile.readFileSync(dataFile);

  try {

    /*
    if (data.lastOrder) {
      let lastOrder = moment(data.lastOrder);

      // TODO refactor: use the function maybe
      if (moment().subtract(1, 'day').isBefore(lastOrder)) {
        throw new Error("The last order is less than 24hrs ago (" + lastOrder.format() + ")");
      }
    }
    */

    if (req.body.imgURL == '') {
      throw Error("No image given");
    }

    SSOHelper.getPostcardcreatorToken(
      config.username,
      config.password,
      function(err, token) {
        console.log("TOKEN IS" , token)
        if (err) {
          console.error("Error getting token", err)
          throw err
          return
        }

        let client = new Postcardcreator(token);

        console.log("Creating postcard");
        let message = req.body.message;
        let imgPath = path.join(__dirname, '../../../../', req.body.imgURL);
        let assetStream = fs.createReadStream(imgPath);

        let recipient = {
          salutation : req.body.salutation,
          givenName  : req.body.givenName,
          familyName : req.body.familyName,
          company    : req.body.company,
          street     : req.body.street,
          postCode   : req.body.postCode,
          place      : req.body.place
        };

        let postcard = new Postcard(assetStream, message, recipient);

        console.log("Sending postcard")
        client.sendPostcard(postcard, function(err, result) {
          if (err) {
            console.log("Error when sending the postcard. ", err);
            //handleError(err);
            return;
          }

          console.log("Postcard sent with success !");
          console.log(result);
          res.json({ type: 'success', message: 'Sent!' });
        });

        let data = jsonfile.readFileSync(dataFile);
        data.lastOrder = moment();
        jsonfile.writeFileSync(dataFile, data);
      })
  }
  catch (ex) {
    res.json({ type: 'warning', message: ex.message });
  }
});


router.get('/postcards/last',  (req, res, next) => {
  res.json({ isOneDayAgo: isOneDayAgo() });
});
