let express = require('express')

let router = new express.Router
export default router

router.use(require('./image'))
router.use(require('./postcard'))
