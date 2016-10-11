let express      = require('express')
let config       = require('../../../lib/config')

let router = new express.Router()

router.get('/addresses', (req, res) => {
  let data = config.address()

  res.json({ data })
})

export default router
