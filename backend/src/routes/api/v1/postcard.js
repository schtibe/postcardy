let express = require('express')
let multer = require('multer')
let moment = require('moment')
let jsonfile = require('jsonfile')
let sendPostcard = require('../../../lib/postcard')
let image = require('../../../lib/image')

let dataFile = `${__dirname}/../../../../../config/data.json`
let configFile = `${__dirname}/../../../../../config/postconfig.json`

let config = require(configFile)

let router = new express.Router()

router.post('/postcards',  (req, res, next) => {
  let data = jsonfile.readFileSync(dataFile)

  try {
    if (req.body.imgURL === '') {
      throw Error('No image given')
    }

    let message = req.body.message
    let imageStream = image.readImage(req.body.imgURL)

    let recipient = {
      salutation : req.body.salutation,
      givenName  : req.body.givenName,
      familyName : req.body.familyName,
      company    : req.body.company,
      street     : req.body.street,
      postCode   : req.body.postCode,
      place      : req.body.place
    }

    sendPostcard(
      config.username,
      config.password,
      recipient,
      imageStream,
      message,
      {
        success: (result) => {
          res.json({ type: 'success', message: 'Sent!' })

          data.lastOrder = moment()
          jsonfile.writeFileSync(dataFile, data)
        },
        error: (error) => {
          res.json({ type: 'error', message: error })
        }
      }
    )
  }
  catch (ex) {
    res.json({ type: 'error', message: ex.message })
  }
})


router.get('/postcards/last',  (req, res, next) => {
  let data = jsonfile.readFileSync(dataFile)
  let lastOrder = moment(data.lastOrder)

  res.json({ lastOrder })
})


export default router
